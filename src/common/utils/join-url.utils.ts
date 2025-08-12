export const joinURL = (baseURL: string, path: string) => {
  const trimmedBase = baseURL.replace(/\/+$/, '');
  const trimmedPath = path.replace(/^\/+/, '');
  return `${trimmedBase}/${trimmedPath}`;
};
