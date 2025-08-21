export interface PlayerProgressBarProps {
  progress: number; // 0~100
  currentTime: number; // sec
  duration: number; // sec
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onSeekStart?: () => void;
  onSeek?: (newProgress: number) => void;
  onSeekEnd?: (finalProgress: number) => void;
}
