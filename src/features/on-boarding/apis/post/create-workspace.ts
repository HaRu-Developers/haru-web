import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import {
  CreateWorkspaceRequestDto,
  CreateWorkspaceResponseDto,
} from '@features/on-boarding/types/apis.types';

import { ON_BOARDING_API_ENDPOINTS } from '@features/on-boarding/constants/end-point.constants';

export const createWorkspace = async ({
  name,
  image,
}: CreateWorkspaceRequestDto): Promise<BaseResponseDto<CreateWorkspaceResponseDto>> => {
  const formData = new FormData();

  formData.append('request', JSON.stringify({ title: name }));

  if (image) {
    formData.append('image', image);
  } else {
    formData.append('image', '');
  }

  for (const [key, value] of formData.entries()) {
    console.log(`[FormData] ${key}:`, value);
  }

  const response = await defaultApi<BaseResponseDto<CreateWorkspaceResponseDto>>(
    ON_BOARDING_API_ENDPOINTS.WORKSPACES,
    {
      method: 'POST',
      body: formData,
      auth: true,
      headers: {},
    },
  );

  return response;
};
