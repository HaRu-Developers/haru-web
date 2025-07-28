export interface Terms {
  title: string;
  content: string;
}

export interface TermsModalProps {
  onClose: () => void;
  terms: Terms;
}
