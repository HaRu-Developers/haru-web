import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS } from '../../api-end-point.constants';
import {
  GetSnsEventAssistantListRequestDto,
  GetSnsEventAssistantListResponseDto,
} from '../../api.types';

/**
 * 특정 워크스페이스의 SNS 이벤트 목록을 조회하는 비동기 함수입니다.
 * @param {GetSnsEventAssistantListRequestDto} dto - 이벤트 목록을 조회할 워크스페이스 ID를 포함하는 객체입니다.
 * @param {string} dto.workspaceId - 이벤트 목록을 조회할 워크스페이스의 고유 ID입니다.
 */
export const GetSnsEventList = async ({ workspaceId }: GetSnsEventAssistantListRequestDto) => {
  const response = await defaultApi<BaseResponseDto<GetSnsEventAssistantListResponseDto>>(
    WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS.SNS_EVENT_ASSISTANT_LIST_DETAIL(workspaceId),
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};
