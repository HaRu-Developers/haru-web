import { Suspense } from 'react';

import { SearchParamsType } from '@common/types/routes.types';

import parseEnum from '@common/utils/parse-enum';

import LeftTab from '@features/ai-meeting-manager/components/LeftTab/LeftTab.client';
import { LeftTabType } from '@features/ai-meeting-manager/components/LeftTab/LeftTab.types';
import LeftPanel from '@features/ai-meeting-manager/components/panels/LeftPanel/LeftPanel.server';
import RightPanel from '@features/ai-meeting-manager/components/panels/RightPanel/RightPanel.server';
import SnsFilePanel from '@features/sns-event-assistant/components/SnsFilePanel/SnsFilePanel.server';
import SnsFileTab from '@features/sns-event-assistant/components/SnsFileTab/SnsFileTab.client';
import { SnsFileTabType } from '@features/sns-event-assistant/components/SnsFileTab/SnsFileTab.types';

import SurveyQuestionPanel from '@features/team-mood-tracker/componets/panels/SurveyQuestionPanel/SurveyQuestionPanel.server';
import TeamMoodReportPanel from '@features/team-mood-tracker/componets/panels/TeamMoodReportPanel/TeamMoodReportPanel.server';
import SurveyQuestionTab from '@features/team-mood-tracker/componets/tabs/SurveyQuestionTab/SurveyQuestionTab.client';
import { SurveyQuestionTabType } from '@features/team-mood-tracker/componets/tabs/SurveyQuestionTab/SurveyQuestionTab.types';
import TeamMoodReportTab from '@features/team-mood-tracker/componets/tabs/TeamMoodReportTab/TeamMoodReportTab.client';
import { TeamMoodReportTabType } from '@features/team-mood-tracker/componets/tabs/TeamMoodReportTab/TeamMoodReportTab.types';

const TestPage = async ({ searchParams }: { searchParams: Promise<SearchParamsType> }) => {
  // // TAB_AI 회의 진행 매니저_좌측
  // const { leftTab } = await searchParams;
  // const formattedLeftTab = parseEnum(leftTab, LeftTabType, LeftTabType.MEETING_SUMMARY);

  // // TAB_SNS 이벤트 어시스턴트
  // const { snsFileTab } = await searchParams;
  // const formattedTab = parseEnum(snsFileTab, SnsFileTabType, SnsFileTabType.PARTICIPANT_LIST);
  // // 실제로는 서버에서 count 가져오기
  // const participantCount = 10;
  // const winnerCount = 10;

  // TAB_팀 분위기 트래커
  // 실제로는 서버에서 설문 정보 가져오기
  const survey = {
    isSubmitted: true,
  };

  const { moodTab } = await searchParams;
  const formattedTab = parseEnum(
    moodTab,
    TeamMoodReportTabType,
    TeamMoodReportTabType.TEAM_MOOD_REPORT,
  );
  // 실제로는 서버에서 count 가져오기
  const ResponseSummary = 10;

  return (
    // <div className="flex gap-4">
    <div>
      {/* TAB_AI 회의 진행 매니저_좌측 */}
      {/* <div>
        <LeftTab current={formattedLeftTab} />
        <LeftPanel tab={formattedLeftTab} />
      </div>
      <div>
        <RightPanel />
      </div> */}
      {/* TAB_SNS 이벤트 어시스턴트 */}
      {/* <div>
        <SnsFileTab
          current={formattedTab}
          counts={{
            [SnsFileTabType.PARTICIPANT_LIST]: participantCount,
            [SnsFileTabType.WINNER_LIST]: winnerCount,
          }}
        />
        <SnsFilePanel tab={formattedTab} />
      </div> */}
      {/* TAB_팀 분위기 트래커 */}
      <SurveyQuestionTab survey={survey} />
      <SurveyQuestionPanel survey={survey} />
      <div>
        <TeamMoodReportTab
          current={formattedTab}
          counts={{
            [TeamMoodReportTabType.ANSWER_SUMMARY]: ResponseSummary,
          }}
        />
        <TeamMoodReportPanel tab={formattedTab} />
      </div>
    </div>
  );
};
export default TestPage;
