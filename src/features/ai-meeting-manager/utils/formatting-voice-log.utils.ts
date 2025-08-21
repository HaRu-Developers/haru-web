import { Speech } from '../types/meeting.types';

const formattingVoiceLog = (speeches: Speech[]) => {
  return speeches
    .map((s) => {
      // speakerId "speaker_0" → 발화자 0
      const speakerNumStr = s.speakerId.replace('speaker_', '');
      return `발화자 ${speakerNumStr}\n${s.text}`;
    })
    .join('\n\n'); // 발화 사이에 빈 줄
};

export default formattingVoiceLog;
