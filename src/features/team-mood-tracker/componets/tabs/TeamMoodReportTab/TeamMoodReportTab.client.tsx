'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import FeatureTabIcons from '@icons/FeatureTabIcons/FeatureTabIcons';
import { FeatureTabIconsState } from '@icons/FeatureTabIcons/FeatureTabIcons.types';

import CategoryOption from '@common/components/CategoryOption/CategoryOption.client';

import DownloadButton from '@buttons/30px/DownloadButton/DownloadButton.client';
import IconButton from '@buttons/IconButton/IconButton.client';

import {
  TeamMoodReportTabLabels,
  TeamMoodReportTabType,
} from '@features/team-mood-tracker/constants/tabs';

import { TeamMoodReportTabProps } from './TeamMoodReportTab.types';

const tabs = Object.values(TeamMoodReportTabType);

const TeamMoodReportTab = ({ current, counts }: TeamMoodReportTabProps) => {
  const pathname = usePathname() ?? '';

  const handleDownloadClick = () => {
    console.log(`다운로드 클릭`);
  };

  const handleCopyClick = () => {
    console.log(`복사 클릭`);
  };

  const handleFileClick = () => {
    console.log('설문 링크 모달 열기');
  };

  return (
    <div className="border-stroke-200 px-266pxr py-13pxr flex h-14 w-300 shrink-0 items-center justify-between border-b border-solid bg-white">
      {/* 탭 영역 */}
      <div className="gap-9pxr inline-flex">
        {tabs.map((tab) => {
          const params = new URLSearchParams();
          params.set('moodTab', tab); // 현재 탭 값 설정

          return (
            <Link key={tab} href={`${pathname}?${params.toString()}`}>
              <CategoryOption
                label={TeamMoodReportTabLabels[tab as TeamMoodReportTabType]}
                active={current === tab}
                {...(tab === TeamMoodReportTabType.ANSWER_SUMMARY && { count: counts[tab] ?? 0 })}
              />
            </Link>
          );
        })}
      </div>
      {/* 버튼 영역 */}
      {current === TeamMoodReportTabType.TEAM_MOOD_REPORT && (
        <div className="items-cente gap-12pxr inline-flex">
          <IconButton
            onClick={handleCopyClick}
            ariaLabel={`${TeamMoodReportTabLabels[current]} 복사`}
          >
            <FeatureTabIcons state={FeatureTabIconsState.COPY} />
          </IconButton>
          <DownloadButton onClick={handleDownloadClick} />
        </div>
      )}

      {current === TeamMoodReportTabType.SURVEY_LIST && (
        <IconButton onClick={handleFileClick} ariaLabel="설문 문항 보기">
          <FeatureTabIcons state={FeatureTabIconsState.LINK} />
        </IconButton>
      )}
    </div>
  );
};

export default TeamMoodReportTab;
