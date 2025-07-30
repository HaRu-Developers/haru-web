export interface ChangableWorkspaceImageProps {
  initialPreview: string | null; // 초기 이미지 주소
  title: string; // 첫 글자 추출에 쓸 제목
  onFileChange?: (file: File) => void;
  className?: string; // 추가 스타일링 필요시 사용
}
