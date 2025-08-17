import { FileType } from '@common/types/file-type.enum';

import { ROUTES } from '@common/constants/routes.constants';

export const modalHrefByFileType = (workspaceId: string): Record<FileType, string> =>
  ({
    [FileType.AI_MEETING_MANAGER]: ROUTES.MODAL.AI_MEETING_MANAGER.CREATE(workspaceId),
    // TODO: 모달 절대 경로 작성
    [FileType.SNS_EVENT_ASSISTANT]: ROUTES.MODAL.SNS_EVENT_ASSISTANT.CREATE_EVENT(workspaceId),
    [FileType.TEAM_MOOD_TRACKER]: ROUTES.MODAL.TEAM_MOOD_TRACKER.CREATE_SURVEY(workspaceId),
  }) as const;
