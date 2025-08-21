import { useEffect, useRef } from 'react';

interface Params {
  micStream: MediaStream | null;
  isPaused: () => boolean;
  setIsFetching: (v: boolean) => void;
}

// 단일 임계치 + on/off 디바운스
const THRESH = 3.0; // 소리 감지 임계치 (rms)
const ON_DELAY_MS = 50; // 켜질 때 지연(짧게)
const OFF_DELAY_MS = 200; // 꺼질 때 지연(조금 길게)

const useLevelFetching = ({ micStream, isPaused, setIsFetching }: Params) => {
  const onTimer = useRef<number | null>(null);
  const offTimer = useRef<number | null>(null);
  const currentRef = useRef<boolean>(false); // 현재 전송상태(켜짐/꺼짐)

  useEffect(() => {
    // 일시정지면 즉시 끄고 종료
    if (isPaused()) {
      if (onTimer.current) clearTimeout(onTimer.current);
      if (offTimer.current) clearTimeout(offTimer.current);
      currentRef.current = false;
      setIsFetching(false);
      return;
    }
    if (!micStream || micStream.getAudioTracks().length === 0) return;

    const ac = new (window.AudioContext || window.webkitAudioContext)();
    const src = ac.createMediaStreamSource(micStream);
    const analyser = ac.createAnalyser();
    analyser.fftSize = 256;
    src.connect(analyser);

    const data = new Uint8Array(analyser.fftSize);
    let raf = 0;

    const setOn = () => {
      if (!currentRef.current) {
        currentRef.current = true;
        setIsFetching(true);
      }
    };
    const setOff = () => {
      if (currentRef.current) {
        currentRef.current = false;
        setIsFetching(false);
      }
    };

    const tick = () => {
      analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        const v = data[i] - 128;
        sum += v * v;
      }
      const rms = Math.sqrt(sum / data.length);

      // on/off 디바운스
      if (rms > THRESH) {
        if (offTimer.current) {
          clearTimeout(offTimer.current);
          offTimer.current = null;
        }
        if (!currentRef.current && !onTimer.current) {
          onTimer.current = window.setTimeout(() => {
            onTimer.current = null;
            setOn();
          }, ON_DELAY_MS);
        }
      } else {
        if (onTimer.current) {
          clearTimeout(onTimer.current);
          onTimer.current = null;
        }
        if (currentRef.current && !offTimer.current) {
          offTimer.current = window.setTimeout(() => {
            offTimer.current = null;
            setOff();
          }, OFF_DELAY_MS);
        }
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    const [track] = micStream.getAudioTracks();
    const onEnded = () => {
      if (raf) cancelAnimationFrame(raf);
      try {
        src.disconnect();
        analyser.disconnect();
        ac.close();
      } catch {
        void 0;
      }
      if (onTimer.current) clearTimeout(onTimer.current);
      if (offTimer.current) clearTimeout(offTimer.current);
      onTimer.current = offTimer.current = null;
      setOff();
    };
    track?.addEventListener('ended', onEnded);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      try {
        src.disconnect();
        analyser.disconnect();
        ac.close();
      } catch {
        void 0;
      }
      track?.removeEventListener('ended', onEnded);
      if (onTimer.current) clearTimeout(onTimer.current);
      if (offTimer.current) clearTimeout(offTimer.current);
      onTimer.current = offTimer.current = null;
    };
  }, [micStream, isPaused, setIsFetching]);
};

export default useLevelFetching;
