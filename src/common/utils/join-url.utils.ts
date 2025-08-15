export const joinURL = (baseURL: string, path: string) => {
  // URL 결합 시 baseURL의 끝, path의 시작 부분에 있는 / 를 제거하여
  // 올바른 URL을 생성하도록 합니다.
  const trimmedBase = baseURL.replace(/\/+$/, '');
  const trimmedPath = path.replace(/^\/+/, '');
  return `${trimmedBase}/${trimmedPath}`;
};
