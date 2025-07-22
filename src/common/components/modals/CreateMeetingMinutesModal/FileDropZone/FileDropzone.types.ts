export interface FileDropzoneProps {
  onFileChange?: (file: File | null) => void;
  initialFile?: File | null;
}
