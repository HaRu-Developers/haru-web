export interface GnbBottomRecorderBarProps {
  hasStarted: boolean;
  onStart: () => void;
  onPauseResume: () => void;
  onStop: () => void;
  elapsedSec: number; // 상단 타이머
}
