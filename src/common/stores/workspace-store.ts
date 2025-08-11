import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface WorkspaceStoreState {
  title: string;
  imageUrl: string | null;
  members: {
    email: string;
    name: string;
  }[];
  actions: {
    setTitle: (title: string) => void;
    setImageUrl: (imageUrl: string | null) => void;
    setMembers: (members: { email: string; name: string }[]) => void;
    addMember: (member: { email: string; name: string }) => void;
    removeMember: (email: string) => void;
  };
}

const workspaceStore = create<WorkspaceStoreState>()(
  devtools(
    immer((set) => ({
      title: '',
      imageUrl: null,
      members: [],
      actions: {
        setTitle: (title: string) =>
          set((state) => {
            state.title = title;
          }),
        setImageUrl: (imageUrl: string | null) =>
          set((state) => {
            state.imageUrl = imageUrl;
          }),
        setMembers: (members: { email: string; name: string }[]) =>
          set((state) => {
            state.members = members;
          }),
        addMember: (member: { email: string; name: string }) =>
          set((state) => {
            state.members.push(member);
          }),
        removeMember: (email: string) =>
          set((state) => {
            state.members = state.members.filter((m) => m.email !== email);
          }),
      },
    })),
  ),
);

export default workspaceStore;
