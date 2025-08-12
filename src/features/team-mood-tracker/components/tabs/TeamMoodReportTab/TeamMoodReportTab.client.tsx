'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import FeatureTabIcons from '@icons/FeatureTabIcons/FeatureTabIcons';
import { FeatureTabIconsState } from '@icons/FeatureTabIcons/FeatureTabIcons.types';

import CategoryOption from '@common/components/CategoryOption/CategoryOption.client';

import DownloadButton from '@buttons/30px/DownloadButton/DownloadButton.client';
import IconButton from '@buttons/IconButton/IconButton.client';

import { TeamMoodReportTabLabels } from './TeamMoodReportTab.constants';
import { TeamMoodReportTabProps, TeamMoodReportTabType } from './TeamMoodReportTab.types';

const tabs = Object.values(TeamMoodReportTabType);

const TeamMoodReportTab = ({
  current,
  counts,
  handleCopyClick,
  handleDownloadClick,
  handleFileClick,
}: TeamMoodReportTabProps) => {
  const pathname = usePathname() ?? '';

  return (
    <div className="py-13pxr flex h-14 w-full shrink-0 items-center justify-between bg-white">
      {/* 탭 영역 */}
      <div className="gap-9pxr flex items-center">
        {tabs.map((tab) => {
          const params = new URLSearchParams();
          params.set('moodTab', tab);

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
      <div className="gap-12pxr flex items-center">
        {current === TeamMoodReportTabType.TEAM_MOOD_REPORT && (
          <>
            <IconButton
              onClick={handleCopyClick}
              ariaLabel={`${TeamMoodReportTabLabels[current]} 복사`}
            >
              <FeatureTabIcons state={FeatureTabIconsState.COPY} />
            </IconButton>
            <DownloadButton onClick={handleDownloadClick} />
          </>
        )}

        {current === TeamMoodReportTabType.SURVEY_LIST && (
          <IconButton onClick={handleFileClick} ariaLabel="설문 문항 보기">
            <FeatureTabIcons state={FeatureTabIconsState.LINK} />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default TeamMoodReportTab;
