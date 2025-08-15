// lib/audio/workletModule.ts
export function getResamplerWorkletURL(): string {
  const workletCode = `
  // 48k -> 16k (factor 3) with LPF(FIR) + decimation, 20ms(320) framing
  class Resample16kProcessor extends AudioWorkletProcessor {
    constructor() {
      super();
      this._srcRate = sampleRate;        // 보통 48000
      this._dstRate = 16000;
      this._ratio = this._srcRate / this._dstRate; // 3.0
      if (Math.abs(this._ratio - 3) > 1e-6) {
        // 예상과 다르면 그냥 통과(안전장치)
        console.warn('[Resample16k] unexpected ratio', this._ratio);
      }

      // === FIR 설계 (Windowed Sinc) ===
      // 컷오프는 Nyquist(8k)보다 살짝 낮게: 7.2kHz
      const fc = 7200;                 // Hz
      const N  = 63;                   // 탭 길이(홀수 권장)
      this._fir = this._designFIR_LPF(fc, N, this._srcRate);
      this._firLen = this._fir.length;
      this._half = (this._firLen - 1) >>> 1;

      // 스트리밍 상태(버퍼/위상)
      this._prev = new Float32Array(this._firLen - 1); // FIR 경계 상태
      this._phase = 0; // decimation phase: 0,1,2

      // 출력 누적 후 20ms(320샘플)로 프레이밍
      this._accum = [];
      this._accumLen = 0;
    }

    // == FIR 설계: Windowed Sinc (Hann) ==
    _designFIR_LPF(fc, N, fs) {
      const h = new Float32Array(N);
      const wc = 2 * Math.PI * (fc / fs); // 정규화 각주파수
      const M = N - 1;
      let sum = 0;
      for (let n = 0; n < N; n++) {
        const m = n - M / 2;
        // ideal sinc LPF (normalized)
        const sinc = m === 0 ? wc / Math.PI : Math.sin(wc * m) / (Math.PI * m);
        // Hann window
        const w = 0.5 * (1 - Math.cos((2 * Math.PI * n) / M));
        const val = sinc * w;
        h[n] = val;
        sum += val;
      }
      // DC 이득 1로 정규화
      for (let n = 0; n < N; n++) h[n] /= sum || 1;
      return h;
    }

    _toMono(channelData) {
      if (channelData.length === 1) return channelData[0];
      const L = channelData[0], R = channelData[1];
      const out = new Float32Array(L.length);
      for (let i = 0; i < L.length; i++) out[i] = 0.5 * (L[i] + R[i]);
      return out;
    }

    _floatToInt16(f32) {
      const out = new Int16Array(f32.length);
      for (let i = 0; i < f32.length; i++) {
        let s = Math.max(-1, Math.min(1, f32[i]));
        out[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
      }
      return out;
    }

    // FIR 컨볼루션(스트리밍): prev(길이 N-1) + in → out(입력과 동일 길이)
    _firFilter(input) {
      const N = this._firLen;
      const M = N - 1;
      const L = input.length;
      const ext = new Float32Array(M + L);
      ext.set(this._prev, 0);
      ext.set(input, M);

      const out = new Float32Array(L);
      const h = this._fir;

      // 단순 O(N*L) 컨볼루션 (N=63이면 충분히 가벼움)
      for (let i = 0; i < L; i++) {
        let acc = 0;
        // h[0..N-1] * x[i .. i+N-1] (ext 기준 i..i+N-1)
        for (let k = 0; k < N; k++) {
          acc += h[k] * ext[i + k];
        }
        out[i] = acc;
      }

      // state 갱신: 마지막 M개를 prev로 보관
      this._prev.set(ext.subarray(L, L + M), 0);
      return out;
    }

    // 3배 decimation (phase 유지)
    _decimateBy3(y) {
      const len = y.length;
      const out = [];
      let count = 0;
      for (let i = this._phase; i < len; i += 3) {
        out.push(y[i]);
        count++;
      }
      // 다음 청크 시작 시위상을 맞추기 위해 phase 갱신
      this._phase = (this._phase + (len % 3)) % 3;

      return Float32Array.from(out);
    }

    // 20ms(320샘플) 프레이밍 후 메인스레드로 Int16 전송
    _frameAndPost(samples16k) {
      if (samples16k.length) {
        this._accum.push(samples16k);
        this._accumLen += samples16k.length;
      }
      if (this._accumLen < 320) return;

      // 누적 합치기
      const flat = new Float32Array(this._accumLen);
      let o = 0;
      for (const a of this._accum) { flat.set(a, o); o += a.length; }
      this._accum = [];
      this._accumLen = 0;

      // 320씩 끊어 전송
      let idx = 0;
      while (idx + 320 <= flat.length) {
        const frame = flat.subarray(idx, idx + 320);
        const i16 = this._floatToInt16(frame);
        this.port.postMessage(i16, [i16.buffer]); // Transfer
        idx += 320;
      }
      // 남은 꼬리 다시 누적
      if (idx < flat.length) {
        const tail = flat.subarray(idx);
        this._accum.push(tail);
        this._accumLen = tail.length;
      }
    }

    process(inputs) {
      const input = inputs[0];
      if (!input || input.length === 0) return true;

      // 1) 스테레오 -> 모노
      const mono = this._toMono(input);

      // 2) FIR 저역통과 필터링
      const y = this._firFilter(mono);

      // 3) Decimate by 3 (48k -> 16k), 위상 유지
      const y16k = this._decimateBy3(y);

      // 4) 20ms 프레이밍(Int16 변환) → 메인스레드로 전송
      this._frameAndPost(y16k);

      return true;
    }
  }

  registerProcessor('resample-16k', Resample16kProcessor);
  `;
  const blob = new Blob([workletCode], { type: 'application/javascript' });
  return URL.createObjectURL(blob);
}
