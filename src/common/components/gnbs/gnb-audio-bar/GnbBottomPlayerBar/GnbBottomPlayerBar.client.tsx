'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import PlayPauseButton from '../PlayPauseButton/PlayPauseButton.client';
import { PlayPauseButtonStatus } from '../PlayPauseButton/PlayPauseButton.types';
import PlayerProgressBar from '../PlayerProgressBar/PlayerProgressBar.client';

interface GnbBottomPlayerBarProps {
  // audioBlob: Blob | null;
  audioUrl: string;
}

const GnbBottomPlayerBar = ({ audioUrl }: GnbBottomPlayerBarProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) {
      return;
    }
    // console.log('Audio', audio.duration);

    const handleCanPlay = () => {
      // console.log('Audio metadata loaded', audio);
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) {
        // duration 직접 사용
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
    };

    // 이벤트 리스너 등록
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      // 클리너 함수
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, [audioUrl]);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();

      if (!audioRef.current) return;

      const clickX = e.nativeEvent.offsetX;
      const width = e.currentTarget.clientWidth;

      audioRef.current.currentTime = (clickX / width) * duration;
    },
    [duration],
  );

  // 드래그용 핸들러 추가
  const handleSeek = useCallback(
    (newProgress: number) => {
      if (!audioRef.current) return;

      audioRef.current.currentTime = (newProgress / 100) * duration;
    },
    [duration],
  );

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  // if (!audioRef.current) {
  //   return <span>NO AUDIO REF AVAILABLE</span>;
  // }

  return (
    <div className="w-656pxr h-68pxr rounded-100pxr border-stroke-200/70 px-16pxr flex flex-row items-center border bg-white">
      <PlayPauseButton
        status={isPlaying ? PlayPauseButtonStatus.PAUSE : PlayPauseButtonStatus.PLAY}
        onClick={togglePlay}
      />
      {/* 숨겨진 audio 태그로 실제 재생 */}
      <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} hidden />
      <PlayerProgressBar
        progress={progress}
        onClick={handleProgressClick}
        onSeek={handleSeek}
        currentTime={currentTime}
        duration={duration}
      />
    </div>
  );
};

export default GnbBottomPlayerBar;
