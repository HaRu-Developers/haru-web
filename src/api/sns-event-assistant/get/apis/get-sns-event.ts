import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS } from '../../api-end-point.constants';
import '../../api.types';
import { GetSnsEventAssistantRequestDto, GetSnsEventAssistantResponseDto } from '../../api.types';

/**
 * 특정 SNS 이벤트의 상세 정보를 조회하는 비동기 함수입니다.
 * @param {GetSnsEventAssistantRequestDto} dto - 상세 정보를 조회할 SNS 이벤트의 ID를 포함하는 객체입니다.
 * @param {string} dto.snsEventId - 상세 정보를 조회할 SNS 이벤트의 고유 ID입니다.
 */
export const GetSnsEvent = async ({ snsEventId }: GetSnsEventAssistantRequestDto) => {
  const response = await defaultApi<BaseResponseDto<GetSnsEventAssistantResponseDto>>(
    WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS.SNS_EVENT_ASSISTANT_DETAIL(snsEventId),
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};
