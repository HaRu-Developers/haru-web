import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.types';

import {
  CreateWorkspaceRequestDto,
  CreateWorkspaceResponseDto,
} from '@features/on-boarding/types/apis.types';

import { API_ENDPOINTS } from '@features/on-boarding/constants/end-point.constants';

export const createWorkspace = async ({
  name,
  image,
}: CreateWorkspaceRequestDto): Promise<BaseResponseDto<CreateWorkspaceResponseDto>> => {
  const formData = new FormData();
  formData.append('name', name);
  if (image) {
    formData.append('image', image);
  }

  const response = await defaultApi<BaseResponseDto<CreateWorkspaceResponseDto>>(
    API_ENDPOINTS.WORKSPACES,
    {
      method: 'POST',
      body: formData,
      headers: {},
    },
  );

  return response;
};
