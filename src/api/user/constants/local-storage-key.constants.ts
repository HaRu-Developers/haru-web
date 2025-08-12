export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'HaRu_ACCESS_TOKEN',
  REFRESH_TOKEN: 'HaRu_REFRESH_TOKEN',
} as const;

export type LocalStorageKey = keyof typeof LOCAL_STORAGE_KEYS;
export type LocalStorageValue = (typeof LOCAL_STORAGE_KEYS)[LocalStorageKey];
