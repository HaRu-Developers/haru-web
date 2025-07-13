import { TeamMoodReportTabType } from '@features/team-mood-tracker/constants/tabs';

import { TeamMoodReportPanelProps } from './TeamMoodReportPanel.types';
import AnswerSummary from './components/AnswerSummary/AnswerSummary.server';
import SurveyList from './components/SurveyList/SurveyList.server';
import TeamMoodReport from './components/TeamMoodReport/TeamMoodReport.server';

const TeamMoodReportPanel = ({ tab }: TeamMoodReportPanelProps) => {
  switch (tab) {
    case TeamMoodReportTabType.TEAM_MOOD_REPORT:
      return <TeamMoodReport />;
    case TeamMoodReportTabType.ANSWER_SUMMARY:
      return <AnswerSummary />;
    case TeamMoodReportTabType.SURVEY_LIST:
      return <SurveyList />;
  }
};

export default TeamMoodReportPanel;
