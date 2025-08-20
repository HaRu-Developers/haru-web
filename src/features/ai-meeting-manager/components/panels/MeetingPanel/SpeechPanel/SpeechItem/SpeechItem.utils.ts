import { SpeakerIconsState } from '@icons/SpeakerIcons/SpeakerIcons.types';

/** speaker id에서 숫자만 추출 */
/** "speaker_0" -> 0, 일치 없으면 '' */
export const getSpeekerId = (input: string) => {
  const m = /_(\d+)$/.exec(input); // 마지막 '_' 뒤의 숫자만
  return m ? m[1] : '';
};

// ==== 발화자 아이콘 매핑
// 아이콘 팔레트 - 순환함
const SPEAKER_ICON_STATES: SpeakerIconsState[] = [
  SpeakerIconsState.USER_1,
  SpeakerIconsState.USER_2,
  SpeakerIconsState.USER_3,
  SpeakerIconsState.USER_4,
  SpeakerIconsState.USER_5,
  SpeakerIconsState.USER_6,
  SpeakerIconsState.USER_7, // 회색
];

// 발화자 id(문자열/숫자) → 아이콘 상태 매핑
export function getSpeakerIconStateFromId(id: string): SpeakerIconsState {
  if (!id) return SpeakerIconsState.USER_7;

  return SPEAKER_ICON_STATES[Number(id) % SPEAKER_ICON_STATES.length];
}
