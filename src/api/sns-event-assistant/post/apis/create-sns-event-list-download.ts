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
 * 일단 임시로 만든 함수 - get인지 post인지에 따라 변경 예정
 * @param param0
 * @returns
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
