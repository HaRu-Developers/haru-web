import { GnbSection, SnsGnbTabType } from '@common/constants/gnbs';

export interface GnbTopProps {
  section: GnbSection;
  title?: string; // CUSTOM인 경우에만 사용
  current?: SnsGnbTabType; // 현재 선택된 탭 (탭이 있는 SNS_EVENT_ASSISTANT에서만 사용)
}
