'use client';

import CategoryOption from '@common/components/CategoryOption/CategoryOption.client';

import { RightTabLabels, RightTabType } from '@features/ai-meeting-manager/constants/tabs';

import { useTabInfo } from '@features/ai-meeting-manager/hooks/stores/useTabStore';

const RightTab = () => {
  const { rightTab } = useTabInfo();

  return (
    <div className="border-b-stroke-200 flex h-14 w-[480px] shrink-0 flex-col items-start justify-center gap-2.5 border-b border-solid bg-white px-5 py-[13px]">
      <CategoryOption label={RightTabLabels[rightTab as RightTabType]} active />
    </div>
  );
};

export default RightTab;
