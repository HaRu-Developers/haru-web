// ✅ 참여자 리스트 (count 포함)
// 복사
// 다운로드 - 파일 형식 모달

// ✅ 당첨자 리스트 (count 포함)
// 복사
// 다운로드 - 파일 형식 모달

// ✅ SNS 링크

'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import FeatureTabIcons from '@icons/FeatureTabIcons/FeatureTabIcons';
import { FeatureTabIconsState } from '@icons/FeatureTabIcons/FeatureTabIcons.types';

import CategoryOption from '@common/components/CategoryOption/CategoryOption.client';
import IconButton from '@common/components/buttons/IconButton/IconButton.client';

import { TabLabels, TabType } from '@features/sns-event-assistant/constants/tabs';

import { TabProps } from './Tab.types';

// ✅ 참여자 리스트 (count 포함)
// 복사
// 다운로드 - 파일 형식 모달

// ✅ 당첨자 리스트 (count 포함)
// 복사
// 다운로드 - 파일 형식 모달

// ✅ SNS 링크

const tabs = Object.values(TabType);

const Tab = ({ current, counts }: TabProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname() ?? '';

  const handleDownloadClick = (tab: TabType) => {
    console.log(`${tab} 탭에서 다운로드 클릭`);
  };

  const handleCopyClick = (tab: TabType) => {
    console.log(`${tab} 탭에서 복사 클릭`);
  };
  return (
    <div className="border-b-stroke-200 w-1200pxr px-266pxr py-13pxr flex h-14 shrink-0 items-center justify-between border-b border-solid bg-white">
      {/* 탭 영역 */}
      <div className="gap-9pxr inline-flex">
        {tabs.map((tab) => {
          const rawParams = searchParams?.toString() ?? '';
          const params = new URLSearchParams(rawParams);
          params.set('snsTab', tab); // 현재 탭 값 설정

          return (
            <Link key={tab} href={`${pathname}?${params.toString()}`}>
              <CategoryOption
                label={TabLabels[tab as TabType]}
                active={current === tab}
                {...(tab !== TabType.SNS_LINK && { count: counts[tab] ?? 0 })}
              />
            </Link>
          );
        })}
      </div>

      {/* 버튼 영역 */}
      {current !== TabType.SNS_LINK && (
        <div className="inline-flex items-center">
          <IconButton
            onClick={() => handleCopyClick(current)}
            ariaLabel={`${TabLabels[current]} 복사`}
          >
            <FeatureTabIcons state={FeatureTabIconsState.COPY} />
          </IconButton>
          {/* TODO: 다운로드 버튼으로 변경 필요 */}
          <button onClick={() => handleDownloadClick(current)}>다운로드</button>
        </div>
      )}
    </div>
  );
};

export default Tab;
