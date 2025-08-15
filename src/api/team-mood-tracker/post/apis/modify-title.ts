import { defaultApi } from '@lib/fetcher';

import { BaseResponseDto } from '@common/types/api.common.types';

import { ModifyMoodTrackerTitleRequestDto } from '@/api/team-mood-tracker/apis.types';
import { MOOD_TRACKER_API_ENDPOINTS } from '@/api/team-mood-tracker/end-point.constants';

/**
 * 생성된 분위기 트래커(설문)의 제목을 수정하는 API
 * @param moodTrackerHashedId - 해싱된 mood-tracker ID
 * @param title - 새로운 제목
 */

export const ModifyMoodTrackerTitle = async ({
  moodTrackerHashedId,
  title,
}: ModifyMoodTrackerTitleRequestDto): Promise<BaseResponseDto<object>> => {
  const response = await defaultApi<BaseResponseDto<object>>(
    MOOD_TRACKER_API_ENDPOINTS.MODIFY_TITLE(moodTrackerHashedId),
    {
      method: 'PATCH',
      body: JSON.stringify({ title }),
      auth: true,
    },
  );

  return response;
};
