import { ImageSize } from '../images/types/images.common.types';

export interface FileCreatedInfoProps {
  name: string;
  userId: string;
  dateTime: string;
  profileSize?: ImageSize;
  isLoading?: boolean;
  isDateTimeDeadline?: boolean;
}
