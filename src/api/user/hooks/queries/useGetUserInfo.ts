import { getUserInfo } from '@api/user/apis/get/get-user-info';
import { UserInfoResponseDto } from '@api/user/types/api.types';

import { BaseResponseDto } from '@common/types/api.common.types';

import queryKeys from '@common/constants/query-key.constants';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

export const useGetUserInfo = () => {
  return useAfterQuery<BaseResponseDto<UserInfoResponseDto>>({
    queryKey: queryKeys.user.userInfo.queryKey,
    queryFn: getUserInfo,
    enabled: true,
    retry: false,
    throwOnError: true,
    // extra: (queryResult) => queryResult.data?.result ?? {},
  });
};
