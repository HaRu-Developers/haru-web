import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS } from '../../api-end-point.constants';
import {
  CreateSnsEventAssistantRequestDto,
  CreateSnsEventAssistantResponseDto,
} from '../../api.types';

/**
 * 새로운 SNS 이벤트를 생성하는 비동기 함수입니다.
 * @param {CreateSnsEventAssistantRequestDto} dto - 생성할 SNS 이벤트의 정보를 담은 객체입니다.
 * @param {string} dto.workspaceId - 이벤트를 생성할 워크스페이스의 고유 ID입니다.
 * @param {string} dto.title - 새로운 이벤트의 제목입니다.
 * @param {string} dto.snsEventLink - SNS 이벤트의 원본 링크입니다.
 * @param {SnsEventAssistantCondition} dto.snsCondition - 이벤트 추첨 조건을 정의하는 객체입니다.
 */
export const CreateSnsEvent = async ({
  workspaceId,
  title,
  snsEventLink,
  snsCondition,
}: CreateSnsEventAssistantRequestDto) => {
  const response = await defaultApi<BaseResponseDto<CreateSnsEventAssistantResponseDto>>(
    WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS.SNS_EVENT_ASSISTANT_CREATE(workspaceId),
    {
      method: 'POST',
      body: JSON.stringify({
        title,
        snsEventLink,
        snsCondition,
      }),
      auth: true,
    },
  );

  return response;
};
