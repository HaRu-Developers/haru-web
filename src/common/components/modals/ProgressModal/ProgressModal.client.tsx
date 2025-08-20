'use client';

import { useEffect, useRef, useState } from 'react';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import { clamp01 } from '@common/utils/clamp.utils';

import ProgressBar from '@common/components/ProgressBar/ProgressBar.client';

import { ProgressModalProps } from './ProgressModal.types';

const ProgressModal = ({
  onClose,
  progress: externalProgress = 0,
  noProgress,
}: ProgressModalProps) => {
  // ===== noProgress용 수동 progress 설정
  /**
   * 내부(수동) progress 진행 기간
   */
  const DURATION = 2000; // ms
  // 내부(수동) progress 진행률
  const [internalProgress, setInternalProgress] = useState(0);

  // RAF 기반 3초(3000ms) 애니메이션
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!noProgress) {
      // 모드 해제 시 RAF 정리
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startRef.current = null;
      return;
    }

    // noProgress가 켜지면 애니메이션 시작(0으로 리셋)
    setInternalProgress(0);
    startRef.current = null;

    const tick = (t: number) => {
      // 애니메이션이 처음 시작한 순간의 타임스탬프 (ms) 를 startRef.current에 대입
      if (startRef.current === null) startRef.current = t;
      // 경과 시간 계산 === 지금 프레임의 시각 - 시작 시각
      const elapsed = t - startRef.current;
      // 진행률 퍼센트로 환산
      const pct = Math.floor(clamp01(elapsed / DURATION) * 100);

      setInternalProgress(pct);

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // 100에서 멈춤
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startRef.current = null;
    };
  }, [noProgress]);

  /**
   * 실제 렌더에 사용할 진행률
   */
  const progress = noProgress
    ? internalProgress
    : Math.max(0, Math.min(100, Math.floor(externalProgress)));

  const isComplete = progress >= 100;
  const mainText = isComplete ? '다운로드 완료!' : '다운로드 진행 중...';
  const subText = isComplete
    ? '다운로드가 완료됐어요. 파일을 확인해 보세요!'
    : '파일을 다운로드하고 있어요. 조금만 기다려주세요!';

  return (
    <div className="w-396pxr h-240pxr rounded-16pxr shadow-modal relative flex flex-col items-center justify-center bg-white">
      <button onClick={onClose} className="top-22pxr right-20pxr absolute">
        <CrossIcons state={CrossIconsState.SIZE_20_GRAY_200} />
      </button>
      <div className="gap-y-6pxr flex flex-col items-center justify-center text-center">
        <p className="text-t3-bd text-black">{mainText}</p>
        <p className="text-b3-rg text-gray-300">{subText}</p>
      </div>
      <div className="mt-41pxr">
        <ProgressBar progress={progress} />
      </div>
    </div>
  );
};

export default ProgressModal;
