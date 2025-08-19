import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS } from '../../api-end-point.constants';
import { UpdateSnsEventAssistantRequestDto } from '../../api.types';

/**
 * 특정 SNS 이벤트의 제목을 수정하는 비동기 함수입니다.
 * @param {UpdateSnsEventAssistantRequestDto} dto - 수정할 이벤트의 ID와 새로운 제목을 포함하는 객체입니다.
 * @param {string} dto.snsEventId - 수정할 SNS 이벤트의 고유 ID입니다.
 * @param {string} dto.title - 수정할 새로운 이벤트 제목입니다.
 */
export const UpdateSnsEvent = async ({ snsEventId, title }: UpdateSnsEventAssistantRequestDto) => {
  const response = await defaultApi<BaseResponseDto<unknown>>(
    WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS.SNS_EVENT_ASSISTANT_EDIT(snsEventId),
    {
      method: 'PATCH',
      body: JSON.stringify({ title }),
      auth: true,
    },
  );

  return response;
};
