import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';
import { Format, SnsEventAssistantListType } from '@common/types/download.enum.types';

import { WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS } from '../../api-end-point.constants';
import {
  GetSnsEventAssistantListDownloadRequestDto,
  GetSnsEventAssistantListDownloadResponseDto,
} from '../../api.types';

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
    query.append('format', Format.PDF);
  } else {
    query.append('format', format);
  }

  const url = `${WORKSPACES_SNS_EVENT_ASSISTANT_API_END_POINTS.SNS_EVENT_ASSISTANT_LIST_DOWNLOAD(snsEventId)}?
    ${query.toString()}`;
  const response = await defaultApi<BaseResponseDto<GetSnsEventAssistantListDownloadResponseDto>>(
    url,
    {
      method: 'GET',
      auth: true,
    },
  );

  return response;
};
