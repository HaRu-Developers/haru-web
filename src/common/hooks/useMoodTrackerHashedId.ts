'use client';

import { useParams, useSearchParams } from 'next/navigation';

export const useMoodTrackerHashedId = () => {
  const params = useParams<{ moodTrackerHashedId: string }>();

  return {
    moodTrackerHashedId: params.moodTrackerHashedId,
  };
};
