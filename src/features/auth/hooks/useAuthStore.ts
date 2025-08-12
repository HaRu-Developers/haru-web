import useAuthStore from '@features/auth/stores/auth-store';

export const useAuthState = () => useAuthStore((state) => state.actions);
export const useUser = () => useAuthStore((state) => state.user);
