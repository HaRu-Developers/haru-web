import { TermsType } from '@common/components/modals/terms/TermsModal.types';

export interface TermsDetail {
  type: TermsType;
  title: string;
  content: string;
}

export type fetchTermsDetailResponseDto = TermsDetail;
