/**
 * playbar에서 쓸 Mic Controller
 */
export type MicController = {
  stop: () => Promise<void>;
  pause: () => void;
  resume: () => void;
  isPaused: () => boolean;
};

/**
 * 음성 받아 리샘플 해서 전송 파이프라인
 */
export const startMicAndPipeToWebSocket = async (ws: WebSocket): Promise<MicController> => {
  // 마이크 권한 요청
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      channelCount: 1,
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
  });
  // 샘플레이트 지정
  const ac = new AudioContext({ sampleRate: 48000 });

  // Worklet 프로세서 로드
  await ac.audioWorklet.addModule('/worklet/resample16k.js');

  // Worklet 프로세서 인스턴스 생성
  const src = ac.createMediaStreamSource(stream);
  const node = new AudioWorkletNode(ac, 'Resample16kProcessor');

  let paused = false;

  const FRAME_SAMPLES = 320;
  const q: number[] = [];
  const toI16 = (f: number) => {
    const s = Math.max(-1, Math.min(1, f));
    return s < 0 ? (s * 0x8000) | 0 : (s * 0x7fff) | 0;
  };

  // Worklet이 보내는 Float32Array(길이 320) 프레임을 받는 핸들러
  node.port.onmessage = (e: MessageEvent<Float32Array>) => {
    // 일시정지 상태거나 ws가 열려있지 않으면 리턴
    if (paused || ws.readyState !== WebSocket.OPEN) return;
    const f32 = e.data;
    // 들어온 Float32 샘플을 toI16으로 Int16로 변환, 큐 q에 쌓음
    for (let i = 0; i < f32.length; i++) q.push(toI16(f32[i]));
    // FRAME_SAMPLES(320) 이상 쌓일 때마다 Int16Array(320)로 잘라 ws.send(frame.buffer) 전송
    while (q.length >= FRAME_SAMPLES) {
      const frame = new Int16Array(FRAME_SAMPLES);
      for (let i = 0; i < FRAME_SAMPLES; i++) frame[i] = q[i];
      q.splice(0, FRAME_SAMPLES);
      ws.send(frame.buffer);
    }
  };

  src.connect(node);

  return {
    // 송신을 막음
    pause: () => {
      paused = true;
    },
    // 송신을 품
    resume: () => {
      paused = false;
    },
    // 송신 막음 여부
    isPaused: () => paused,
    // 핸들러 해제, 노드 연결 해제, 트랙 stop, 컨텍스트 close()까지 깔끔 종료
    stop: async () => {
      try {
        node.port.onmessage = null;
      } catch {
        void 0;
      }
      try {
        node.disconnect();
        src.disconnect();
      } catch {
        void 0;
      }
      try {
        stream.getTracks().forEach((t) => t.stop());
      } catch {
        void 0;
      }
      try {
        await ac.close();
      } catch {
        void 0;
      }
    },
  };
};
