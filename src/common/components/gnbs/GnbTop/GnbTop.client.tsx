'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { GnbSection, SnsGnbTabType } from '@common/types/gnbs.types';

import { SnsGnbTabLabels, sectionConfigs } from '@common/constants/gnbs.constants';

import CategoryOption from '@common/components/CategoryOption/CategoryOption.client';
import InputSearchBox from '@common/components/inputs/InputSearchBox/InputSearchBox.client';

import { GnbTopProps } from './GnbTop.types';

const GnbTop = ({ section, title, current }: GnbTopProps) => {
  const pathname = usePathname() ?? '';

  const config =
    section === GnbSection.CUSTOM ? sectionConfigs[section](title ?? '') : sectionConfigs[section];

  const isTabSection = section === GnbSection.SNS_EVENT_ASSISTANT;
  const isCustomSection = section === GnbSection.CUSTOM;

  return (
    <div className="flex w-full flex-col items-start">
      {/* 상단 제목 */}
      <div className="border-b-stroke-200 h-60pxr py-13pxr flex items-center justify-between self-stretch border-b border-solid bg-white px-6">
        <p className="text-t3-sb text-black">{config.title}</p>
        {!isCustomSection && <InputSearchBox />}
      </div>
      {!isCustomSection && (
        // 하단 탭 or 단순 옵션
        <div className="border-b-stroke-200 py-13pxr flex h-14 items-center gap-2.5 self-stretch border-b border-solid bg-white px-6">
          {isTabSection
            ? (Object.keys(SnsGnbTabLabels) as SnsGnbTabType[]).map((tab) => {
                const params = new URLSearchParams();
                params.set('snsGnbTab', tab);

                return (
                  <Link key={tab} href={`${pathname}?${params.toString()}`}>
                    <CategoryOption label={SnsGnbTabLabels[tab]} active={current === tab} />
                  </Link>
                );
              })
            : config.options.map((option) => (
                <CategoryOption key={option.key} label={option.label} active />
              ))}
        </div>
      )}
    </div>
  );
};

export default GnbTop;
