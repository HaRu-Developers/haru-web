import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { MEETING_API_ENDPOINTS } from '../../api-end-point.constants';
import { CreateMeetingMinutesRequestDto, CreateMeetingMinutesResponseDto } from '../../api.types';

/**
 * AI Meeting 회의록 생성
 *
 * multipart/form-data로 파일(agendaFile)과 JSON(request)을 함께 업로드합니다.
 *
 * @param {CreateMeetingMinutesRequestDto} params - 업로드 파일과 생성 요청 본문
 */
export const createNewMeetingMinutes = async ({
  agendaFile,
  request, // { workspaceId, title }
}: CreateMeetingMinutesRequestDto) => {
  const formData = new FormData();

  formData.append('agendaFile', agendaFile);
  formData.append(
    'request',
    JSON.stringify({ title: request.title, workspaceId: request.workspaceId }),
  );

  const response = await defaultApi<BaseResponseDto<CreateMeetingMinutesResponseDto>>(
    MEETING_API_ENDPOINTS.CREATE_NEW_MEETINNG_MINUTES,
    {
      method: 'POST',
      auth: true,
      body: formData,
    },
  );

  return response;
};

export default createNewMeetingMinutes;
