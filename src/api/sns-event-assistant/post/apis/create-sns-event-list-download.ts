import { defaultApi } from '@lib/fetcher';

import { DownloadFormat } from '@api/team-mood-tracker/apis.types';

import { BaseResponseDto } from '@common/types/api.common.types';
import { SnsEventAssistantListType } from '@common/types/download.enum.types';

import { WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS } from '../../api-end-point.constants';
import {
  GetSnsEventAssistantListDownloadRequestDto,
  GetSnsEventAssistantListDownloadResponseDto,
} from '../../api.types';

/**
 * SNS 이벤트 목록 다운로드 요청을 생성하는 비동기 함수입니다.
 * API의 요청 방식(GET/POST)에 따라 변경될 수 있습니다.
 * @param {GetSnsEventAssistantListDownloadRequestDto} dto - 다운로드할 목록의 정보와 형식을 포함하는 객체입니다.
 * @param {string} dto.snsEventId - 다운로드할 SNS 이벤트의 고유 ID입니다.
 * @param {DownloadFormat} [dto.format] - 다운로드할 파일의 형식입니다. 값이 없을 경우 `PDF`로 기본 설정됩니다.
 * @param {SnsEventAssistantListType} [dto.listType] - 다운로드할 목록의 타입입니다. 값이 없을 경우 `PARTICIPANT`로 기본 설정됩니다.
 */
export const CreateSnsEventDownload = async ({
  snsEventId,
  format,
  listType,
}: GetSnsEventAssistantListDownloadRequestDto) => {
  const query = new URLSearchParams();
  if (!listType) {
    query.append('listType', SnsEventAssistantListType.PARTICIPANT);
  } else {
    query.append('listType', listType);
  }

  if (!format) {
    query.append('format', DownloadFormat.PDF);
  } else {
    query.append('format', format);
  }

  const url = `${WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS.SNS_EVENT_ASSISTANT_LIST_DOWNLOAD(snsEventId)}?${query.toString()}`;
  const response = await defaultApi<BaseResponseDto<GetSnsEventAssistantListDownloadResponseDto>>(
    url,
    {
      method: 'POST',
      auth: true,
    },
  );

  return response;
};
