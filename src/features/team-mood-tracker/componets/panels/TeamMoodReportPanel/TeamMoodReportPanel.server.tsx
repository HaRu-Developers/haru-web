import { TeamMoodReportTabType } from '@features/team-mood-tracker/constants/tabs';

import { TeamMoodReportPanelProps } from './TeamMoodReportPanel.types';
import QuestionList from './components/QuestionList/QuestionList.server';
import ResponseSummary from './components/ResponseSummary/ResponseSummary.server';
import TeamMoodReport from './components/TeamMoodReport/TeamMoodReport.server';

const TeamMoodReportPanel = ({ tab }: TeamMoodReportPanelProps) => {
  switch (tab) {
    case TeamMoodReportTabType.TEAM_MOOD_REPORT:
      return <TeamMoodReport />;
    case TeamMoodReportTabType.RESPONSE_SUMMARY:
      return <ResponseSummary />;
    case TeamMoodReportTabType.QUESTION_LIST:
      return <QuestionList />;
  }
};

export default TeamMoodReportPanel;
