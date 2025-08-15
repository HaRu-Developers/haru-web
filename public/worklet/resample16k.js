class Resample16kProcessor extends AudioWorkletProcessor {
  constructor() {
    this.buffer = [];
    this.phase = 0; // 출력 16k 타임라인 상의 위치
    this.inRate = sampleRate;
    this.outRate = 16000;
    this.step = this.outRate / this.inRate; // 입력 1샘플 당 출력에서 전진하는 양
    this.prev = 0;
  }

  // 입력: 32-bit float, stereo/multi → mono로 평균냄
  process(inputs) {
    const input = inputs[0];
    if (!input || input.length === 0) return true;

    const ch0 = input[0] || new Float32Array(0);
    const ch1 = input[1] || null;

    for (let i = 0; i < ch0.length; i++) {
      const mono = ch1 ? (ch0[i] + ch1[i]) * 0.5 : ch0[i];

      // prev(직전 입력 샘플)와 mono(이번 입력 샘플) 사이를 선형 보간해
      // 필요한 만큼 16k 출력 샘플을 뽑음
      while (this.phase <= 1.0) {
        const y = this.prev + (mono - this.prev) * this.phase;
        this.buffer.push(y);
        // 320 넘으면 보냄
        if (this.buffer.length >= 320) {
          const frame = new Float32Array(320);
          for (let j = 0; j < 320; j++) frame[j] = this.buffer[j];
          this.buffer = this.buffer.slice(320);
          this.port.postMessage(frame);
        }
        this.phase += this.step;
      }
      this.phase -= 1.0;
      this.prev = mono;
    }
    return true;
  }
}

// Resample16kProcessor로 메인 스레드에서 노드를 생성할 수 있게
registerProcessor('Resample16kProcessor', Resample16kProcessor);
