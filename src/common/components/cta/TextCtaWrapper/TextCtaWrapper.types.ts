import { FileType } from '@common/types/file-type.enum';

import { BigintString } from '@common/constants/routes.constants';

export interface TextCtaWrapperProps {
  fileType: FileType;
  // TODO: 팀 내에 공유 후에 optional 제거 필요
  // TODO: BigintString -> string 변환, 해당 부분 다시 신경쓰세요!
  workspaceId?: string;
}
