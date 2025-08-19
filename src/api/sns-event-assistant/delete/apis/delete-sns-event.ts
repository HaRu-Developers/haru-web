import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS } from '../../api-end-point.constants';
import { DeleteSnsEventAssistantRequestDto } from '../../api.types';

/**
 * SNS 이벤트를 삭제하는 비동기 함수입니다.
 * @param {DeleteSnsEventAssistantRequestDto} dto - 삭제할 이벤트의 ID를 포함하는 객체입니다.
 * @param {string} dto.snsEventId - 삭제할 SNS 이벤트의 고유 ID입니다.
 */
export const DeleteSnsEvent = async ({ snsEventId }: DeleteSnsEventAssistantRequestDto) => {
  const response = await defaultApi<BaseResponseDto<unknown>>(
    WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS.SNS_EVENT_ASSISTANT_DELETE(snsEventId),
    {
      method: 'DELETE',
      auth: true,
    },
  );

  return response;
};
