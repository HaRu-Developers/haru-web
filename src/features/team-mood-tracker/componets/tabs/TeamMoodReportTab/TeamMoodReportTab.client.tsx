// ✅ 팀 분위기 리포트
// 복사
// 다운로드 - 파일 형식 모달
// ✅ 응답 count
// ✅ 설문 문항
// 파일버튼 - 설문 링크 모달

'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import Copy from '@svgs/component-set/CopyIcon.svg';
import LinkIcon from '@svgs/component-set/LinkIcon.svg';

import CategoryOption from '@common/components/CategoryOption/CategoryOption.client';
import IconButton from '@common/components/button/IconButton/IconButton.client';

import {
  TeamMoodReportTabLabels,
  TeamMoodReportTabType,
} from '@features/team-mood-tracker/constants/tabs';

import { TeamMoodReportTabProps } from './TeamMoodReportTab.types';

// ✅ 팀 분위기 리포트
// 복사
// 다운로드 - 파일 형식 모달
// ✅ 응답 count
// ✅ 설문 문항
// 파일버튼 - 설문 링크 모달

// ✅ 팀 분위기 리포트
// 복사
// 다운로드 - 파일 형식 모달
// ✅ 응답 count
// ✅ 설문 문항
// 파일버튼 - 설문 링크 모달

const tabs = Object.values(TeamMoodReportTabType);

const TeamMoodReportTab = ({ current, counts }: TeamMoodReportTabProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

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
    <div className="border-b-stroke-200 flex h-14 w-[1200px] shrink-0 items-center justify-between border-b border-solid bg-white px-[266px] py-[13px]">
      {/* 탭 영역 */}
      <div className="inline-flex gap-[9px]">
        {tabs.map((tab) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set('moodTab', tab); // 현재 탭 값 설정

          return (
            <Link key={tab} href={`${pathname}?${params.toString()}`}>
              <CategoryOption
                label={TeamMoodReportTabLabels[tab as TeamMoodReportTabType]}
                active={current === tab}
                {...(tab === TeamMoodReportTabType.RESPONSE_SUMMARY && { count: counts[tab] ?? 0 })}
              />
            </Link>
          );
        })}
      </div>
      {/* 버튼 영역 */}
      {current === TeamMoodReportTabType.TEAM_MOOD_REPORT && (
        <div className="inline-flex items-center">
          <IconButton
            onClick={handleCopyClick}
            ariaLabel={`${TeamMoodReportTabLabels[current]} 복사`}
          >
            <Copy width="30px" height="30px" />
          </IconButton>
          <button onClick={handleDownloadClick}>다운로드</button>
        </div>
      )}

      {current === TeamMoodReportTabType.QUESTION_LIST && (
        <IconButton onClick={handleFileClick} ariaLabel="설문 문항 보기">
          <LinkIcon width="30px" height="30px" />
        </IconButton>
      )}
    </div>
  );
};

export default TeamMoodReportTab;
