'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { formatAudioProgress } from '../audio-bar.utils';
import { PlayerProgressBarProps } from './PlayerProgressBar.types';

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const PlayerProgressBar = ({
  progress,
  currentTime,
  duration,
  onSeekStart,
  onSeek,
  onSeekEnd,
}: PlayerProgressBarProps) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const pointerIdRef = useRef<number | null>(null);

  const calcPct = useCallback((clientX: number) => {
    const el = barRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const ratio = clamp01((clientX - rect.left) / rect.width);
    return ratio * 100;
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!barRef.current) return;
      barRef.current.setPointerCapture(e.pointerId);
      pointerIdRef.current = e.pointerId;
      setDragging(true);
      onSeekStart?.();
      const pct = calcPct(e.clientX);
      onSeek?.(pct);
      e.preventDefault();
    },
    [calcPct, onSeek, onSeekStart],
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!dragging) return;
      if (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current) return;
      const pct = calcPct(e.clientX);
      onSeek?.(pct);
    },
    [dragging, calcPct, onSeek],
  );

  const handlePointerUp = useCallback(
    (e: PointerEvent) => {
      if (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current) return;
      setDragging(false);
      pointerIdRef.current = null;
      // 마지막 위치 확정
      const pct = calcPct(e.clientX);
      onSeekEnd?.(pct);
    },
    [calcPct, onSeekEnd],
  );

  // 전역 포인터 리스너
  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => handlePointerMove(e);
    const up = (e: PointerEvent) => handlePointerUp(e);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, [dragging, handlePointerMove, handlePointerUp]);

  // 클릭 점프(드래그가 아닐 때만)
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (dragging) return;
      const pct = calcPct(e.clientX);
      onSeekStart?.();
      onSeek?.(pct);
      onSeekEnd?.(pct);
    },
    [dragging, calcPct, onSeekStart, onSeek, onSeekEnd],
  );

  return (
    <div className="gap-y-5pxr mt-8pxr ml-8pxr flex touch-none flex-col select-none">
      <div
        ref={barRef}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        aria-label="Playback position"
        tabIndex={0}
        className="h-5pxr w-564pxr bg-stroke-200 relative cursor-pointer rounded-full outline-none"
        onPointerDown={handlePointerDown}
        onClick={handleClick}
      >
        {/* 진행 구간 */}
        <div
          className={[
            'bg-primary h-full rounded-full',
            dragging ? 'transition-none' : 'transition-all duration-300',
          ].join(' ')}
          style={{ width: `${progress}%` }}
        />
        {/* 핸들 */}
        <div
          className={[
            'h-14pxr w-14pxr bg-primary absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full',
            dragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
            'transition-opacity duration-100',
          ].join(' ')}
          style={{ left: `${progress}%` }}
        />
      </div>

      <div className="mt-5pxr flex w-full flex-row items-center justify-between">
        <span className="text-cap3-rg text-gray-300">
          {formatAudioProgress(currentTime * 1000)}
        </span>
        <span className="text-cap3-rg text-gray-300">{formatAudioProgress(duration * 1000)}</span>
      </div>
    </div>
  );
};

export default PlayerProgressBar;
