export interface ProgressModalProps {
  onClose: () => void;
  progress?: number; // 실제 진행률 사용 (0~100) noProgress=false일 때만 반영
  noProgress?: boolean; // progress 값 없을 때 사용 - 수동으로 progress 올림
}
