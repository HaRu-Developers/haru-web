import { useShallow } from 'zustand/shallow';

import SnsEventAssistantStoreState from '@common/stores/sns-event-assistant-store';

export const useSnsEventAssistantInfo = () =>
  SnsEventAssistantStoreState(
    useShallow((state) => ({
      newTitle: state.newTitle,
      newSnsEventLink: state.newSnsEventLink,
      winnerCount: state.conditions.winnerCount,
      period: state.conditions.period,
      keyword: state.conditions.keyword,
      friendTag: state.conditions.friendTag,
    })),
  );

export const useSnsEventAssistantActions = () =>
  SnsEventAssistantStoreState((state) => state.actions);
