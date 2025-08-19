/**
 * 추천 질문 정보
 *
 * @property {number} questionId - 질문의 고유 ID
 * @property {string} question - 질문 내용
 */
export interface Question {
  questionId: number;
  question: string;
}

/**
 * 회의 발화 정보
 *
 * @property {number} segmentId - 발화 구간의 고유 ID
 * @property {string} speakerId - 발화자의 식별자
 * @property {string} text - 발화 내용
 * @property {string} startTime - 발화 시작 시각 (ISO 8601 형식)
 * @property {Question[]} aiQuestions - 해당 발화와 연결된 AI 추천 질문 목록
 */
export interface Speech {
  segmentId: number;
  speakerId: string;
  text: string;
  startTime: string; // ISO
  aiQuestions: Question[];
}

// WS 수신
export type WsInbound =
  | {
      type: 'utterance';
      data: { speechId: number; speakerId: string; text: string; startTime: string };
    }
  | {
      type: 'ai_questions';
      data: { speechId: number; questions: Array<string> };
    };

/**
 * UI 용 질문 정보
 *
 * @property {number} id - 질문의 고유 ID
 * @property {string} segmentId - 발화 구간의 고유 ID
 * @property {string} text - 질문 내용
 */
export interface UiQuestion {
  id: number;
  segmentId: number;
  text: string;
}

/**
 * 플레이이바 조작으로 발화 포커스를 하기 위한
 * 시작, 끝 시간 매핑 타입
 */
export interface FocusSegment {
  segmentId: number;
  startMs: number;
  endMs: number;
}
