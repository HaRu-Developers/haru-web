import { useEffect, useRef } from 'react';

import type { MicController } from '../utils/capture-and-send.utils';
import { useSpeechQuestionActions } from './stores/useSpeechQuestionStore';

const THRESH_ON = 0.025; // 이 값 이상이면 켜질 후보가 됨
const THRESH_OFF = 0.018; // 이 값 이하면 꺼짐
const ON_DELAY_MS = 60; // 켜질 때 디바운스
const OFF_DELAY_MS = 250; // 꺼질 때 디바운스
const ALPHA = 0.8; // EMA(지수이동평균) 스무딩 계수

const useMicLevelFetching = (micCtlRef: React.MutableRefObject<MicController | null>) => {
  const { setIsFetching } = useSpeechQuestionActions();
  const onTimer = useRef<number | null>(null);
  const offTimer = useRef<number | null>(null);
  const currentRef = useRef(false);
  const emaRef = useRef(0);
  const subscribedRef = useRef(false);

  useEffect(() => {
    let raf = 0;
    let unsub: (() => void) | null = null;

    const clearOn = () => {
      if (onTimer.current) {
        clearTimeout(onTimer.current);
        onTimer.current = null;
      }
    };
    const clearOff = () => {
      if (offTimer.current) {
        clearTimeout(offTimer.current);
        offTimer.current = null;
      }
    };
    const clearAll = () => {
      clearOn();
      clearOff();
    };

    const setOn = () => {
      if (!currentRef.current) {
        currentRef.current = true;
        console.debug('[level] => ON (setIsFetching(true))');
        setIsFetching(true);
      }
    };
    const setOff = () => {
      if (currentRef.current) {
        currentRef.current = false;
        console.debug('[level] => OFF (setIsFetching(false))');
        setIsFetching(false);
      }
    };

    const attach = () => {
      const mic = micCtlRef.current;
      if (!mic) {
        raf = requestAnimationFrame(attach); // 준비될 때까지 한 프레임 뒤에 재시도
        return;
      }
      if (subscribedRef.current) return;

      console.debug('[level] attaching subscribeLevel');
      subscribedRef.current = true;

      unsub = mic.subscribeLevel((rmsRaw, paused) => {
        console.debug(
          '[level]',
          { paused, rmsRaw: +rmsRaw.toFixed(4), ema: +emaRef.current.toFixed(4) },
          {
            onTimer: !!onTimer.current,
            offTimer: !!offTimer.current,
            fetching: currentRef.current,
          },
        );

        if (paused) {
          clearAll();
          setOff();
          return;
        }

        emaRef.current = ALPHA * emaRef.current + (1 - ALPHA) * rmsRaw;
        const rms = emaRef.current;

        if (!currentRef.current) {
          if (rms >= THRESH_ON) {
            if (!onTimer.current) {
              onTimer.current = window.setTimeout(() => {
                onTimer.current = null;
                setOn();
                clearOff();
              }, ON_DELAY_MS);
            }
          } else {
            if (onTimer.current) {
              clearTimeout(onTimer.current);
              onTimer.current = null;
            }
          }
        } else {
          if (rms < THRESH_OFF) {
            if (!offTimer.current) {
              offTimer.current = window.setTimeout(() => {
                offTimer.current = null;
                setOff();
                clearOn();
              }, OFF_DELAY_MS);
            }
          } else {
            clearOff();
          }
        }
      });

      if (mic.isPaused()) {
        clearAll();
        setOff();
      }
    };

    attach();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (unsub) unsub();
      subscribedRef.current = false;
      clearAll();
    };
  }, [micCtlRef, setIsFetching]);
};

export default useMicLevelFetching;
