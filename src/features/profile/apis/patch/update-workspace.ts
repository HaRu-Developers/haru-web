import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.types';

import {
  UpdateWorkspaceRequestDto,
  UpdateWorkspaceResponseDto,
} from '@features/profile/types/apis.types';

import { API_ENDPOINTS } from '@features/profile/constants/end-point.constants';

export const updateWorkspace = async ({
  title,
  image,
}: UpdateWorkspaceRequestDto): Promise<BaseResponseDto<UpdateWorkspaceResponseDto>> => {
  const formData = new FormData();

  formData.append('request', JSON.stringify({ title }));

  if (image) {
    formData.append('image', image);
  } else {
    formData.append('image', '');
  }

  for (const [key, value] of formData.entries()) {
    console.log(`[FormData] ${key}:`, value);
  }

  const response = await defaultApi<BaseResponseDto<UpdateWorkspaceResponseDto>>(
    API_ENDPOINTS.WORKSPACES,
    {
      method: 'PATCH',
      body: formData,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    },
  );

  return response;
};
