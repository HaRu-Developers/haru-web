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
      data: { segmentId: number; speakerId: string; text: string; startTime: string };
    }
  | {
      type: 'ai_questions';
      data: { segmentId: number; questions: Array<string> };
    };
