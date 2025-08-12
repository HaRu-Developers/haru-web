import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface UserStoreState {
  name: string;
  password: string;
  actions: {
    setName: (name: string) => void;
    setPassword: (password: string) => void;
  };
}

const userStore = create<UserStoreState>()(
  devtools(
    immer((set) => ({
      name: '',
      password: '',
      actions: {
        setName: (name: string) =>
          set((state) => {
            state.name = name;
          }),
        setPassword: (password: string) =>
          set((state) => {
            state.password = password;
          }),
      },
    })),
  ),
);

export default userStore;
