/**
 * 줄바꿈 통일: CRLF(\r\n), CR(\r)을 LF(\n)로 변환
 *
 * 윈도우/에디터/서버마다 줄바꿈이 \r\n 또는 \n으로 다를 수 있어
 * \r\n을 \n으로 통일해 실제 내용 변화만 감지하려는 목적
 */
export const normalizeLineEndings = (s: string): string => s.replace(/\r\n?/g, '\n');

/**
 * 두 문자열을 줄바꿈 차이 무시하고 비교하는 함수
 * */
export const equalIgnoringLineEndings = (a: string, b: string): boolean =>
  normalizeLineEndings(a) === normalizeLineEndings(b);
