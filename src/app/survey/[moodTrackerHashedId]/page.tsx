'use client';

import { useMoodTrackerHashedId } from '@common/hooks/useMoodTrackerHashedId';

import SurveyInfo from '@common/components/box-text/SurveyInfo/SurveyInfo.server';

import TeamMoodSurveyQuestionSection from '@features/team-mood-tracker/components/mood-reports/question-section/TeamMoodSurveyQuestionSection/TeamMoodSurveyQuestionSection.client';

const PublicSurveyPage = () => {
  const { moodTrackerHashedId } = useMoodTrackerHashedId();

  return (
    <>
      <div className="w-1200pxr my-64pxr flex flex-col items-center">
        <SurveyInfo title={'TEST'} content={'TEST'} />
        <TeamMoodSurveyQuestionSection moodTrackerHashedId={moodTrackerHashedId} />
      </div>
    </>
  );
};

export default PublicSurveyPage;
