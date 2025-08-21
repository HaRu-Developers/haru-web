import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';
import { DownloadFormat, SnsEventAssistantListType } from '@common/types/download.enum.types';

import { WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS } from '../../api-end-point.constants';
import {
  GetSnsEventAssistantListDownloadRequestDto,
  GetSnsEventAssistantListDownloadResponseDto,
} from '../../api.types';

/**
 * SNS 이벤트 목록을 다운로드하는 비동기 함수입니다.
 * @param {GetSnsEventAssistantListDownloadRequestDto} dto - 다운로드할 목록의 정보와 형식을 포함하는 객체입니다.
 * @param {string} dto.snsEventId - 다운로드할 SNS 이벤트의 고유 ID입니다.
 * @param {SnsEventAssistantListType} [dto.listType] - 다운로드할 목록의 타입입니다 (`PARTICIPANT` 또는 `WINNER`). 값이 없을 경우 `PARTICIPANT`로 기본 설정됩니다.
 * @param {DownloadFormat} [dto.format] - 다운로드할 파일의 형식입니다. 값이 없을 경우 `PDF`로 기본 설정됩니다.
 */
export const GetSnsEventListDownLoad = async ({
  snsEventId,
  listType,
  format,
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
      method: 'GET',
      auth: true,
    },
  );

  return response;
};
