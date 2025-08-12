export interface Terms {
  title: string;
  content: string;
}

export interface TermsModalProps {
  onClose: () => void;
  terms: Terms;
}

export enum TermsModalType {
  TERMS_OF_SERVICE = 'termsOfService',
  PRIVACY_POLICY = 'privacyPolicy',
  MARKETING_CONSENT = 'marketingConsent',
}
