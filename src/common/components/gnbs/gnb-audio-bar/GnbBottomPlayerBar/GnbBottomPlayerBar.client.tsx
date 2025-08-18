'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { ToastType } from '@common/types/toast.types';

import { useToastActions } from '@common/hooks/stores/useToastStore';

import PlayPauseButton from '../PlayPauseButton/PlayPauseButton.client';
import { PlayPauseButtonStatus } from '../PlayPauseButton/PlayPauseButton.types';
import PlayerProgressBar from '../PlayerProgressBar/PlayerProgressBar.client';

interface GnbBottomPlayerBarProps {
  // audioBlob: Blob | null;
  audioUrl: string;
}

const GnbBottomPlayerBar = ({ audioUrl }: GnbBottomPlayerBarProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const wasPlayingBeforeSeekRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSeeking, setIsSeeking] = useState(false); // 드래그 중
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const { addToast } = useToastActions();

  const stopRaf = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // 부드러운 진행 업데이트 (재생 중에만)
  const startRaf = useCallback(() => {
    stopRaf();
    const tick = () => {
      const audio = audioRef.current;
      if (audio && !isSeeking) {
        const ct = audio.currentTime ?? 0;
        const dur = audio.duration ?? duration ?? 0;
        setCurrentTime(ct);
        setProgress(dur ? (ct / dur) * 100 : 0);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [duration, isSeeking, stopRaf]);

  useEffect(() => {
    if (isPlaying) startRaf();
    else stopRaf();
    return stopRaf;
  }, [isPlaying, startRaf, stopRaf]);

  // 오디오 이벤트
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) {
      return;
    }
    // console.log('Audio', audio.duration);

    const onLoadedMeta = () => setDuration(audio.duration ?? 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setProgress(0);
    };
    const onError = (e: Event) => {
      console.error('Audio error:', e);
      addToast({ text: '오디오 바에서 에러가 발생했습니다.', type: ToastType.ERROR });
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', onLoadedMeta);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMeta);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [audioUrl, addToast]);

  // 클릭으로 점프
  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!audioRef.current || !duration) return;
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      audioRef.current.currentTime = ratio * duration;
      setCurrentTime(audioRef.current.currentTime);
      setProgress(ratio * 100);
    },
    [duration],
  );

  // 드래그(시킹) 지원: 드래그 중엔 화면만 업데이트, 드롭에서 실제 seek
  const handleSeekStart = useCallback(() => {
    if (!audioRef.current) return;
    wasPlayingBeforeSeekRef.current = !audioRef.current.paused;
    setIsSeeking(true);
    audioRef.current.pause(); // 시킹 중엔 잠깐 멈추면 소리/점프 어색함 줄어듦
  }, []);

  const handleSeek = useCallback(
    (newProgress: number) => {
      // 진행바 UI만 미리 이동
      setProgress(newProgress);
      if (!duration) return;
      const previewTime = (newProgress / 100) * duration;
      setCurrentTime(previewTime);
    },
    [duration],
  );

  const handleSeekEnd = useCallback(
    (finalProgress: number) => {
      if (!audioRef.current || !duration) {
        setIsSeeking(false);
        return;
      }
      const t = (finalProgress / 100) * duration;
      audioRef.current.currentTime = t;
      setCurrentTime(t);
      setProgress(finalProgress);
      setIsSeeking(false);

      // 드래그 시작 전에 재생 중이었으면 다시 재생
      if (wasPlayingBeforeSeekRef.current) {
        audioRef.current.play().catch(() => {});
      }
    },
    [duration],
  );

  // 토글 재생
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch((e) => {
        console.warn('play() failed:', e);
        addToast({ text: '오디오 바에서 에러가 발생했습니다.', type: ToastType.ERROR });
      });
    } else {
      audio.pause();
    }
  };

  return (
    <div className="w-656pxr h-68pxr rounded-100pxr border-stroke-200/70 px-16pxr flex flex-row items-center border bg-white">
      <PlayPauseButton
        status={isPlaying ? PlayPauseButtonStatus.PAUSE : PlayPauseButtonStatus.PLAY}
        onClick={togglePlay}
      />
      {/* 숨겨진 audio 태그로 실제 재생 */}
      <audio ref={audioRef} src={audioUrl} preload="metadata" hidden />
      <PlayerProgressBar
        progress={progress}
        onClick={handleProgressClick}
        onSeekStart={handleSeekStart}
        onSeek={handleSeek}
        onSeekEnd={handleSeekEnd}
        currentTime={currentTime}
        duration={duration}
      />
    </div>
  );
};

export default GnbBottomPlayerBar;
