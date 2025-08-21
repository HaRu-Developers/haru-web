'use client';

import { useRouter } from 'next/navigation';

import { PublicOrPrivate } from '@api/team-mood-tracker/apis.types';
import { useCreateSurvey } from '@api/team-mood-tracker/post/mutations/useCreateSurvey';

import { GnbSection } from '@common/types/gnbs.types';

import { ROUTES } from '@common/constants/routes.constants';

import FileCreatedInfo from '@common/components/FileCreatedInfo/FileCreatedInfo.client';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';
import InputSurveyQuestion from '@common/components/inputs/input-survey/InputSurveyQuestion/InputSurveyQuestion.client';

import WriteCompleteButton from '@buttons/30px/WriteCompleteButton/WriteCompleteButton.client';
import AddQuestionButton from '@buttons/56px/AddQuestionButton/AddQuestionButton.client';

import { useUser } from '@features/auth/hooks/useAuthStore';
import {
  useAddSurveyQuestion,
  useSurveyQuestion,
  useTransferQuestionsToCreateSurveyRequestFormat,
} from '@features/team-mood-tracker/hooks/stores/useSurveyQuestionStore';
import { useGetSurveyInfoInUrl } from '@features/team-mood-tracker/hooks/useGetSurveyInfoInUrl';

import CreateSurveyQuestionButton from '@features/team-mood-tracker/components/create-survey-page/CreateSurveyQuestionButton/CreateSurveyQuestionButton.client';

const CreateSurveyPage = () => {
  const router = useRouter();

  const { workspaceId, pageQuery } = useGetSurveyInfoInUrl();
  // const { questionList, handleAddQuestion } = useCreateSurveyQuestionList();

  // const setQuestions = useSetSurveyQuestions();

  const getQuestions = useSurveyQuestion();
  const addQuestions = useAddSurveyQuestion();
  const getQuestionsToApiFormat = useTransferQuestionsToCreateSurveyRequestFormat();

  const user = useUser(); // 파일 생성자는 현재 로그인한 사용자입니다.

  const onCreateSurveyRequest = () => {
    router.push(ROUTES.MODAL.TEAM_MOOD_TRACKER.REQUEST_SURVEY_CREATION(workspaceId));
  };
  const { mutate: requestCreateNewSurvey } = useCreateSurvey({
    onMutate: onCreateSurveyRequest,
  });

  const handleWriteComplete = () => {
    const transferDueDateIntoKstTime = (date: string) => {
      // 페이지에서 입력받은 dueDate는 UTC 기준이므로, KST로 변환합니다.
      const utcDate = new Date(date);
      const kstOffset = 9 * 60; // KST는 UTC+9
      utcDate.setMinutes(utcDate.getMinutes() + kstOffset);
      return utcDate.toISOString(); // ISO 형식으로 반환
    };

    requestCreateNewSurvey(
      {
        workspaceId,
        surveyData: {
          title: pageQuery.title,
          description: pageQuery.description,
          dueDate: transferDueDateIntoKstTime(pageQuery.dueDate),
          visibility: pageQuery.visibility as PublicOrPrivate,
          questions: getQuestionsToApiFormat(),
        },
      },
      {
        onSuccess: (data) => {
          console.log('onSuccess Triggered');
          router.push(
            ROUTES.MODAL.TEAM_MOOD_TRACKER.SURVEY_CREATED(
              workspaceId,
              data.result.moodTrackerHashedId,
            ),
          );
        },
        onError: (err) => {
          router.back();
          const errMsg = `설문 생성에 실패했습니다: ${err.message}`;
          alert(errMsg);
          throw new Error(errMsg);
        },
      },
    );
  };

  return (
    <div className="mt-24pxr mb-10pxr mx-auto flex w-full flex-col items-center">
      <GnbTop section={GnbSection.CUSTOM} title={pageQuery.title} />
      {/*가운데 정렬을 위해서 존재하는 wrapper*/}
      <div className="border-stroke-200 flex w-full justify-center border-b-1">
        {/*상단 제목 + 생성자 + 설문 문항 생성 / 작성 완료*/}
        <div className="w-668pxr mt-24pxr flex flex-col items-start">
          {/* InputFileTitle을 쓰는 것은 오버아키텍쳐링으로 판단되므로 span으로 구현 */}
          <span className="text-t1-sb text-black">{pageQuery.title}</span>
          {/*설문 정보*/}
          <div className="text-cap2-md mt-14pxr">
            <FileCreatedInfo
              name={user?.name ?? ''}
              userId={user?.id ?? ''}
              dateTime={pageQuery.dueDate}
              isDateTimeDeadline
            />
          </div>
          {/*설문 문항 생성 / 작성 완료 버튼*/}
          <div className="mt-23pxr mb-13pxr flex w-full flex-row items-center justify-between">
            <CreateSurveyQuestionButton />
            <WriteCompleteButton onClick={handleWriteComplete} />
          </div>
        </div>
      </div>
      {/*여기부터 본문*/}
      <div className="w-668pxr mt-26pxr flex flex-col items-center">
        <AddQuestionButton onClick={addQuestions} className="mb-16pxr" />
        {/*설문 문항들*/}
        <div className="gap-y-14pxr flex flex-col items-center">
          {getQuestions.map((question, index) => {
            return <InputSurveyQuestion key={index} questionId={question.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CreateSurveyPage;
