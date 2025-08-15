import { FileType } from '@common/types/file-type.enum';

import { BigintString } from '@common/constants/routes.constants';

export interface TextCtaWrapperProps {
  fileType: FileType;
  // TODO: 팀 내에 공유 후에 optional 제거 필요
  workspaceId?: BigintString;
}
