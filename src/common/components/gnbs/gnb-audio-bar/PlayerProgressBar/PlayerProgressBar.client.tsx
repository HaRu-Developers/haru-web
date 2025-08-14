'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { formatAudioProgress } from '../audio-bar.util';
import { PlayerProgressBarProps } from './PlayerProgressBar.types';

const PlayerProgressBar = ({
  progress,
  onClick,
  currentTime,
  duration,
  onSeek,
}: PlayerProgressBarProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const calculateProgress = useCallback((clientX: number) => {
    if (!progressBarRef.current) return 0;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const width = rect.width;
    const newProgress = Math.max(0, Math.min(100, (clickX / width) * 100));

    return newProgress;
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      const newProgress = calculateProgress(e.clientX);
      onSeek?.(newProgress);
    },
    [calculateProgress, onSeek],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const newProgress = calculateProgress(e.clientX);
      onSeek?.(newProgress);
    },
    [isDragging, calculateProgress, onSeek],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 글로벌 마우스 이벤트 등록
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <>
      <div
        className="gap-y-5pxr mt-8pxr ml-8pxr group flex cursor-pointer flex-col"
        onClick={onClick}
        onMouseDown={handleMouseDown}
      >
        <div
          ref={progressBarRef}
          className="bg-stroke-200 h-5pxr w-564pxr relative flex items-center rounded-full"
        >
          {/* 진행바 */}
          <div
            className="bg-audio-bar h-full transition-all duration-400"
            style={{ width: `${progress}%` }}
          />
          {/* 핸들 */}
          <div
            className="bg-audio-bar h-14pxr w-14pxr absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-100 group-hover:opacity-100"
            style={{ left: `${progress}%` }}
          />
        </div>

        <div className="flex w-full flex-row items-center justify-between">
          <span className="text-cap3-rg text-gray-300">
            {formatAudioProgress(currentTime * 1000)}
          </span>
          <span className="text-cap3-rg text-gray-300">{formatAudioProgress(duration * 1000)}</span>
        </div>
      </div>
    </>
  );
};

export default PlayerProgressBar;
