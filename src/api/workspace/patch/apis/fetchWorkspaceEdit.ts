import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { WORKSPACE_API_END_POINTS } from '../../api-end-point.constants';
import { UpdateWorkspaceRequestDto, UpdateWorkspaceResponseDto } from '../../api.types';

export const fetchWorkspaceEdit = async ({
  workspaceId,
  title,
  image,
}: UpdateWorkspaceRequestDto) => {
  const formData = new FormData();

  formData.append('request', JSON.stringify({ title: title }));

  if (image) {
    formData.append('image', image);
  }

  for (const [key, value] of formData.entries()) {
    console.log(`[FormData] ${key}:`, value);
  }

  const response = await defaultApi<BaseResponseDto<UpdateWorkspaceResponseDto>>(
    WORKSPACE_API_END_POINTS.WORKSPACE_EDIT(workspaceId),
    {
      method: 'PATCH',
      body: formData,
      auth: true,
    },
  );

  return response;
};
