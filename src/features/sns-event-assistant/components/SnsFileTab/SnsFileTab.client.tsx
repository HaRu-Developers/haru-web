'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import FeatureTabIcons from '@icons/FeatureTabIcons/FeatureTabIcons';
import { FeatureTabIconsState } from '@icons/FeatureTabIcons/FeatureTabIcons.types';

import CategoryOption from '@common/components/CategoryOption/CategoryOption.client';

import DownloadButton from '@buttons/30px/DownloadButton/DownloadButton.client';
import IconButton from '@buttons/IconButton/IconButton.client';

import { SnsFileTabLabels } from './SnsFile.constants';
import { SnsFileTabType } from './SnsFileTab.types';
import { TabProps } from './SnsFileTab.types';

const tabs = Object.values(SnsFileTabType);

const SnsFileTab = ({ current, counts }: TabProps) => {
  const pathname = usePathname() ?? '';

  const handleDownloadClick = (tab: SnsFileTabType) => {
    console.log(`${tab} 탭에서 다운로드 클릭`);
  };

  const handleCopyClick = (tab: SnsFileTabType) => {
    console.log(`${tab} 탭에서 복사 클릭`);
  };
  return (
    <div className="border-stroke-200 px-266pxr py-13pxr flex h-14 w-full shrink-0 items-center justify-between border-b border-solid bg-white">
      {/* 탭 영역 */}
      <div className="gap-9pxr inline-flex">
        {tabs.map((tab) => {
          const params = new URLSearchParams();
          params.set('snsFileTab', tab); // 현재 탭 값 설정

          return (
            <Link key={tab} href={`${pathname}?${params.toString()}`}>
              <CategoryOption
                label={SnsFileTabLabels[tab as SnsFileTabType]}
                active={current === tab}
                {...(tab !== SnsFileTabType.SNS_LINK && { count: counts[tab] ?? 0 })}
              />
            </Link>
          );
        })}
      </div>

      {/* 버튼 영역 */}
      {current !== SnsFileTabType.SNS_LINK && (
        <div className="gap-12pxr inline-flex items-center">
          <div className="inline-flex">
            <IconButton
              onClick={() => handleCopyClick(current)}
              ariaLabel={`${SnsFileTabLabels[current]} 복사`}
            >
              <FeatureTabIcons state={FeatureTabIconsState.COPY} />
            </IconButton>
          </div>
          <DownloadButton onClick={() => handleDownloadClick(current)} />
        </div>
      )}
    </div>
  );
};

export default SnsFileTab;
