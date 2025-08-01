export interface ChangePasswordModalProps {
  onClose: () => void;
  onNextStep: () => void;
  onSubmit?: (password: string) => void;
}
