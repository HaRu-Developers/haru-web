import { FileType } from '@common/types/file-type.enum';

import { ROUTES } from '@common/constants/routes.constants';

export const modalHrefByFileType = (workspaceId: string): Record<FileType, string> =>
  ({
    [FileType.AI_MEETING_MANAGER]: ROUTES.AI_MEETING_MANAGER.MODAL.CREATE(workspaceId),
    // TODO: 모달 절대 경로 작성
    [FileType.SNS_EVENT_ASSISTANT]: '',
    [FileType.TEAM_MOOD_TRACKER]: '',
  }) as const;
