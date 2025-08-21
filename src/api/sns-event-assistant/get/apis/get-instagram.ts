import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS } from '../../api-end-point.constants';
import { GetInstagramRequestDto, GetInstagramResponseDto } from '../../api.types';

/**
 * 인스타 정보 조회 API입니다.
 * @property {string} instagramAccountName - 인스타그램 이름.
 * 인스타 그램이 현재 벡엔드에서 SNS 이벤트로 되어있어서 생성
 * 추후에 Workspace로 변경할 수도 있음
 */
export const GetInstagram = async ({ workspaceId }: GetInstagramRequestDto) => {
  const response = await defaultApi<BaseResponseDto<GetInstagramResponseDto>>(
    WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS.SNS_EVENT_ASSISTANT_INSTAGRAM(workspaceId),
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};
