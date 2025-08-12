import useAuthStore from '@features/auth/stores/auth-store';

export const useAuthStoreActions = () => useAuthStore((state) => state.actions);
export const useUser = () => useAuthStore((state) => state.user);
export const useAccessToken = () => useAuthStore((state) => state.user?.accessToken);
