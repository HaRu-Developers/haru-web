import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { WORKSPACES_ON_BOARDING_API_ENDPOINTS } from '@/api/on-boarding/api-end-point.constants';
import {
  CreateWorkspaceRequestDto,
  CreateWorkspaceResponseDto,
} from '@/api/on-boarding/apis.types';

export const createWorkspace = async ({ name, image }: CreateWorkspaceRequestDto) => {
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
    WORKSPACES_ON_BOARDING_API_ENDPOINTS.WORKSPACES,
    {
      method: 'POST',
      body: formData,
      auth: true,
      headers: {},
    },
  );

  return response;
};
