export interface PlayerProgressBarProps {
  progress: number;
  currentTime: number;
  duration: number;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onSeek: (progress: number) => void;
}
