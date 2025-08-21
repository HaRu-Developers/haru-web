import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { PasswordCheckRequestDto, PasswordCheckResponseDto } from '../../api.types';
import { USER_API_ENDPOINTS } from '../../end-point.constants';

export const postUserPasswordCheck = async ({ requestPassword }: PasswordCheckRequestDto) => {
  const response = await defaultApi<BaseResponseDto<PasswordCheckResponseDto>>(
    USER_API_ENDPOINTS.USER_PASSWORD_CHECK,
    {
      method: 'POST',
      body: JSON.stringify({ requestPassword }),
      auth: true,
    },
  );

  return response;
};
