export interface GnbBottomRecorderBarProps {
  micStream: MediaStream | null; // hook에서 받은 동일 스트림
  isEnding: boolean;
  isPaused: () => boolean;
  connect: () => Promise<void>;
  onOpenEndMeetingModal: () => Promise<void>;
  pauseStreaming: () => void;
  resumeStreaming: () => void;
}
