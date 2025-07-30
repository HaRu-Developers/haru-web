import { FileType } from '@common/types/file-type.enum';

// const mockRecentQueries: string[] = [];
// TODO: 추후 api hook 측에 type 정의 필요

export interface SearchResult {
  fileType: FileType;
  title: string;
  lastOpened: Date;
}
