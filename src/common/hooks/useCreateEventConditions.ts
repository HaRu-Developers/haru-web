// hooks/useEventConditions.ts
import { useCallback, useState } from 'react';

import { EventConditions } from '@common/components/modals/CreateNewEventModal/CreateNewEventModal.types';

const DEFAULT_CONDITIONS: EventConditions = {
  isLiked: false,
  isFollowed: false,
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
    requiredFriendTag: 0,
  },
};

export const useCreateEventConditions = (initialConditions?: Partial<EventConditions>) => {
  const [conditions, setConditions] = useState<EventConditions>({
    ...DEFAULT_CONDITIONS,
    ...initialConditions,
  });

  const updateCondition = useCallback(
    <T extends keyof EventConditions>(key: T, value: EventConditions[T]) => {
      setConditions((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  const toggleLike = useCallback(() => {
    setConditions((prev) => ({
      ...prev,
      isLiked: !prev.isLiked,
    }));
  }, []);

  const toggleFollow = useCallback(() => {
    setConditions((prev) => ({
      ...prev,
      isFollowed: !prev.isFollowed,
    }));
  }, []);

  const togglePeriod = useCallback(() => {
    setConditions((prev) => ({
      ...prev,
      period: {
        ...prev.period,
        isActive: !prev.period.isActive,
      },
    }));
  }, []);

  const toggleKeyword = useCallback(() => {
    setConditions((prev) => ({
      ...prev,
      keyword: {
        ...prev.keyword,
        isActive: !prev.keyword.isActive,
      },
    }));
  }, []);

  const setPeriod = useCallback(
    (endDate: Date) => {
      updateCondition('period', {
        endDate,
        isActive: !!endDate,
      });
    },
    [updateCondition],
  );

  const addKeyword = useCallback((keyword: string) => {
    setConditions((prev) => ({
      ...prev,
      keyword: {
        ...prev.keyword,
        keyword: [...prev.keyword.keyword, keyword],
        isActive: true,
      },
    }));
  }, []);

  const removeKeyword = useCallback((index: number) => {
    setConditions((prev) => {
      const newKeywords = prev.keyword.keyword.filter((_, i) => i !== index);
      return {
        ...prev,
        keyword: {
          ...prev.keyword,
          keyword: newKeywords,
          isActive: newKeywords.length > 0,
        },
      };
    });
  }, []);

  const setFriendTagRequirement = useCallback(
    (requiredFriendTag: number) => {
      updateCondition('friendTag', {
        requiredFriendTag,
        isActive: requiredFriendTag > 0,
      });
    },
    [updateCondition],
  );

  const reset = useCallback(() => {
    setConditions(DEFAULT_CONDITIONS);
  }, []);

  return {
    conditions,
    toggleLike,
    toggleFollow,
    togglePeriod,
    toggleKeyword,
    setPeriod,
    addKeyword,
    removeKeyword,
    setFriendTagRequirement,
    reset,
  };
};
