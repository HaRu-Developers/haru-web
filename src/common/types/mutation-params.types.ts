export interface CommonUseMutationParams {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  retry?: boolean | number;
  retryDelay?: number;
  mutationKey?: string | string[];
}
