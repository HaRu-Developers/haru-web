import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface tabStoreState {
  isEditing: boolean;
  actions: {
    setEditing: (val: boolean) => void;
  };
}

const tabStore = create<tabStoreState>()(
  devtools(
    immer((set) => ({
      isEditing: false,
      actions: {
        setEditing: (val) => set({ isEditing: val }),
      },
    })),
    { name: 'TabStore' },
  ),
);

export default tabStore;
