import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { EventConditions } from '@common/components/modals/CreateNewEventModal/CreateNewEventModal.types';

const DEFAULT_CONDITIONS: EventConditions = {
  winnerCount: null,
  period: {
    isActive: false,
    endDate: null,
  },
  keyword: {
    isActive: false,
    keyword: [],
  },
  friendTag: {
    isActive: false,
    requiredFriendTag: null,
  },
};

export interface SnsEventAssistantStoreState {
  newTitle: string;
  newSnsEventLink: string;
  conditions: EventConditions;
  checkedList: string[];
  isCheckedMode: boolean;
  actions: {
    setNewEventInit: () => void;
    setNewTitle: (title: string) => void;
    setNewSnsEventLink: (link: string) => void;
    setConditions: (conditions: EventConditions) => void;
    setCheckedList: (list: string[]) => void;
    setIsCheckedMode: (isCheckedMode: boolean) => void;
    setWinnerCount: (count: number | null) => void;
    togglePeriod: () => void;
    toggleKeyword: () => void;
    toggleFriendTag: () => void;
    setPeriod: (endDate: Date | null) => void;
    addKeyword: (keyword: string) => void;
    removeKeyword: (index: number) => void;
    changeKeyword: (keywords: string[]) => void;
    setFriendTagRequirement: (requiredFriendTag: number | null) => void;
    resetConditions: () => void;
  };
}

const snsEventAssistantStore = create<SnsEventAssistantStoreState>()(
  devtools(
    immer((set) => ({
      newTitle: '',
      newSnsEventLink: '',
      checkedList: [],
      isCheckedMode: false,
      conditions: DEFAULT_CONDITIONS,
      actions: {
        setNewEventInit: () => {
          set((state) => {
            state.newTitle = '';
            state.newSnsEventLink = '';
            state.conditions = DEFAULT_CONDITIONS;
            state.checkedList = [];
            state.isCheckedMode = false;
          });
        },
        setNewTitle: (title) => {
          set((state) => {
            state.newTitle = title;
          });
        },
        setNewSnsEventLink: (link) => {
          set((state) => {
            state.newSnsEventLink = link;
          });
        },
        setConditions: (newConditions) => {
          set((state) => {
            state.conditions = newConditions;
          });
        },
        setCheckedList: (list) => {
          set((state) => {
            state.checkedList = list;
          });
        },
        setIsCheckedMode: (isCheckedMode) => {
          set((state) => {
            state.isCheckedMode = isCheckedMode;
          });
        },
        setWinnerCount: (count) => {
          set((state) => {
            state.conditions.winnerCount = count;
          });
        },
        togglePeriod: () => {
          set((state) => {
            state.conditions.period.isActive = !state.conditions.period.isActive;
          });
        },
        toggleKeyword: () => {
          set((state) => {
            state.conditions.keyword.isActive = !state.conditions.keyword.isActive;
          });
        },
        toggleFriendTag: () => {
          set((state) => {
            state.conditions.friendTag.isActive = !state.conditions.friendTag.isActive;
          });
        },
        setPeriod: (endDate) => {
          set((state) => {
            state.conditions.period.endDate = endDate;
            state.conditions.period.isActive = !!endDate;
          });
        },
        addKeyword: (keyword) => {
          set((state) => {
            state.conditions.keyword.keyword.push(keyword);
            state.conditions.keyword.isActive = true;
          });
        },
        removeKeyword: (index) => {
          set((state) => {
            state.conditions.keyword.keyword = state.conditions.keyword.keyword.filter(
              (_, i) => i !== index,
            );
            state.conditions.keyword.isActive = state.conditions.keyword.keyword.length > 0;
          });
        },
        changeKeyword: (keywords) => {
          set((state) => {
            state.conditions.keyword.keyword = keywords;
            state.conditions.keyword.isActive = keywords.length > 0;
          });
        },
        setFriendTagRequirement: (requiredFriendTag) => {
          set((state) => {
            state.conditions.friendTag.requiredFriendTag = requiredFriendTag;
            state.conditions.friendTag.isActive = requiredFriendTag !== null;
          });
        },
        resetConditions: () => {
          set((state) => {
            state.conditions = DEFAULT_CONDITIONS;
          });
        },
      },
    })),
  ),
);

export default snsEventAssistantStore;
