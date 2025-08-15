import { ApiErrorBody } from '@common/types/api.common.types';

import queryKeys from '@common/constants/query-key.constants';

import { ApiError } from '@common/errors/ApiError';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import { TermsType } from '@common/components/modals/terms/TermsModal.types';

import { TermsDetail } from '../../api.types';
import fetchTermsDetail from '../apis/fetchTermsDetail';

/**
 * terms 내용 가져오는 훅
 */
const useFetchTermsDetail = (type: TermsType) => {
  return useAfterQuery<
    { result: TermsDetail }, // TData
    ApiError<ApiErrorBody>, // TError
    TermsDetail // TExtra
  >({
    queryKey: queryKeys.terms.detail(type).queryKey,
    queryFn: () => fetchTermsDetail(type),
    retry: false,
    enabled: true,
    extra: (queryResult) => queryResult.data?.result as TermsDetail,
  });
};

export default useFetchTermsDetail;
