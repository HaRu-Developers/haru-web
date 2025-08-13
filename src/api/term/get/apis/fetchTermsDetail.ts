import { defaultApi } from '@lib/fetcher';

import { fetchTermsDetailResponseDto } from '@api/term/api.types';

import { BaseResponseDto } from '@common/types/api.common.types';

import { TermsType } from '@common/components/modals/terms/TermsModal.types';

import { TERM_API_ENDPOINTS } from '../../end-point.constants';

const fetchTermsDetail = async (type: TermsType) => {
  const response = await defaultApi<BaseResponseDto<fetchTermsDetailResponseDto>>(
    `${TERM_API_ENDPOINTS.TERMS_DETAIL}?type=${type}`,
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};

export default fetchTermsDetail;
