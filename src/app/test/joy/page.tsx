import { Suspense } from 'react';

import { SearchParamsType } from '@common/types/routing.types';

import { LeftTabType } from '@features/ai-meeting-manager/constants/tabs';
import { TabType } from '@features/sns-event-assistant/constants/tabs';
import {
  SurveyQuestionTabType,
  TeamMoodReportTabType,
} from '@features/team-mood-tracker/constants/tabs';

import LeftPanel from '@features/ai-meeting-manager/components/panels/LeftPanel/LeftPanel.server';
import RightPanel from '@features/ai-meeting-manager/components/panels/RightPanel/RightPanel.client';
import LeftTab from '@features/ai-meeting-manager/components/tabs/LeftTab/LeftTab.client';
import RightTab from '@features/ai-meeting-manager/components/tabs/RightTab/RightTab.client';
import Panel from '@features/sns-event-assistant/components/Panel/Panel.server';
import Tab from '@features/sns-event-assistant/components/Tab/Tab.client';

import SurveyQuestionPanel from '@features/team-mood-tracker/componets/panels/SurveyQuestionPanel/SurveyQuestionPanel.server';
import TeamMoodReportPanel from '@features/team-mood-tracker/componets/panels/TeamMoodReportPanel/TeamMoodReportPanel.server';
import SurveyQuestionTab from '@features/team-mood-tracker/componets/tabs/SurveyQuestionTab/SurveyQuestionTab.client';
import TeamMoodReportTab from '@features/team-mood-tracker/componets/tabs/TeamMoodReportTab/TeamMoodReportTab.client';

const TestPage = async ({ searchParams }: { searchParams: Promise<SearchParamsType> }) => {
  // TAB_AI 회의 진행 매니저_좌측
  const { leftTab } = await searchParams;
  const formattedLeftTab =
    typeof leftTab === 'string' && Object.values(LeftTabType).includes(leftTab as LeftTabType)
      ? (leftTab as LeftTabType)
      : LeftTabType.MEETING_SUMMARY; // 기본값

  // // TAB_SNS 이벤트 어시스턴트
  // const { snsTab } = await searchParams;
  // const formattedTab =
  //   typeof snsTab === 'string' && Object.values(TabType).includes(snsTab as TabType)
  //     ? (snsTab as TabType)
  //     : TabType.PARTICIPANT_LIST; // 기본값
  // // 실제로는 서버에서 count 가져오기
  // const participantCount = 10;
  // const winnerCount = 10;

  // TAB_팀 분위기 트래커
  // 실제로는 서버에서 설문 정보 가져오기
  // const survey = {
  //   isSubmitted: true,
  // };

  // const { moodTab } = await searchParams;
  // const formattedTab =
  //   typeof moodTab === 'string' &&
  //   Object.values(TeamMoodReportTabType).includes(moodTab as TeamMoodReportTabType)
  //     ? (moodTab as TeamMoodReportTabType)
  //     : TeamMoodReportTabType.TEAM_MOOD_REPORT; // 기본값
  // // 실제로는 서버에서 count 가져오기
  // const ResponseSummary = 10;

  return (
    <div className="flex gap-4">
      {/* <div> */}
      {/* TODO: 로딩 UI를 어느 단위로 처리할지 결정 필요 */}
      {/* TAB_AI 회의 진행 매니저_좌측 */}
      <div>
        <Suspense fallback={<div>탭 로딩 중...</div>}>
          <LeftTab current={formattedLeftTab} />
        </Suspense>
        <Suspense fallback={<div>패널 로딩 중...</div>}>
          <LeftPanel tab={formattedLeftTab} />
        </Suspense>
      </div>
      <div>
        <RightTab />
        <RightPanel />
      </div>
      {/* TAB_SNS 이벤트 어시스턴트 */}
      {/* <div>
        <Suspense fallback={<div>탭 로딩 중...</div>}>
          <Tab
            current={formattedTab}
            counts={{
              [TabType.PARTICIPANT_LIST]: participantCount,
              [TabType.WINNER_LIST]: winnerCount,
            }}
          />
        </Suspense>
        <Suspense fallback={<div>패널 로딩 중...</div>}>
          <Panel tab={formattedTab} />
        </Suspense>
      </div> */}
      {/* TAB_팀 분위기 트래커 */}
      {/* <SurveyQuestionTab survey={survey} />
      <SurveyQuestionPanel survey={survey} /> */}
      {/* <div>
        <Suspense fallback={<div>탭 로딩 중...</div>}>
          <TeamMoodReportTab
            current={formattedTab}
            counts={{
              [TeamMoodReportTabType.ANSWER_SUMMARY]: ResponseSummary,
            }}
          />
        </Suspense>
        <Suspense fallback={<div>패널 로딩 중...</div>}>
          <TeamMoodReportPanel tab={formattedTab} />
        </Suspense>
      </div> */}
    </div>
  );
};
export default TestPage;
