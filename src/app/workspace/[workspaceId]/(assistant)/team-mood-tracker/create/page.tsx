'use client';

import { useState } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { CreateNewSurveyRequestDto } from '@api/team-mood-tracker/apis.types';
import { useCreateSurvey } from '@api/team-mood-tracker/post/mutations/useCreateSurvey';

import { GnbSection } from '@common/types/gnbs.types';

import { ROUTES } from '@common/constants/routes.constants';

import FileCreatedInfo from '@common/components/FileCreatedInfo/FileCreatedInfo.client';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';
import InputFileTitle from '@common/components/inputs/InputFileTitle/InputFileTitle.client';
import InputSurvey from '@common/components/inputs/input-survey/InputSurvey/InputSurvey.client';
import { InputSurveyProps } from '@common/components/inputs/input-survey/InputSurvey/InputSurvey.types';
import {
  InputSurveyQuestionType,
  SurveyVisibility,
} from '@common/components/inputs/input-survey/types/input-survey.common.types';

import WriteCompleteButton from '@buttons/30px/WriteCompleteButton/WriteCompleteButton.client';
import AddQuestionButton from '@buttons/56px/AddQuestionButton/AddQuestionButton.client';

import { useUser } from '@features/auth/hooks/useAuthStore';

import CreateSurveyQuestionButton from '@features/team-mood-tracker/components/create-survey-page/CreateSurveyQuestionButton/CreateSurveyQuestionButton.client';

interface CreateSurveyPageParams {
  title: string;
  dueDate: string;
  description: string;
  visibility: string;
}

const CreateSurveyPage = () => {
  const router = useRouter();

  const params = useParams<{ workspaceId: string }>();
  const workspaceId = params.workspaceId;

  const searchParams = useSearchParams();
  const pageQuery: CreateSurveyPageParams = {
    title: searchParams.get('title') ?? '',
    dueDate: searchParams.get('dueDate') ?? '',
    description: searchParams.get('description') ?? '',
    visibility: searchParams.get('visibility') ?? 'PUBLIC',
  };

  const [surveyTitle, setSurveyTitle] = useState<string>(pageQuery.title);

  const defaultQuestion: InputSurveyProps[] = [
    {
      title: '',
      placeholder: '문항의 제목을 입력하세요.',
      visibility: SurveyVisibility.PRIVATE, // 설문 생성 시에는 PRIVATE로 설정
      type: InputSurveyQuestionType.CHOICE,
      options: [''],
      isMandatory: false,
      isEtc: false,
      description: '',
    },
  ];
  const [questionList, setQuestionList] = useState<InputSurveyProps[]>([...defaultQuestion]);

  const user = useUser(); // 파일 생성자는 현재 로그인한 사용자입니다.

  const onMutate = () => {
    console.log('설문 생성 요청 발생');
    router.push(ROUTES.MODAL.TEAM_MOOD_TRACKER.REQUEST_SURVEY_CREATION(workspaceId));
  };

  const { mutate: requestCreateNewSurvey, status } = useCreateSurvey({
    onMutate,
  });

  const handleWriteComplete = () => {
    const surveyData: CreateNewSurveyRequestDto = {
      title: surveyTitle,
      description: pageQuery.description,
      dueDate: pageQuery.dueDate,
      visibility: pageQuery.visibility as SurveyVisibility, // PUBLIC 또는 PRIVATE
      questions: questionList.map((question) => {
        return {
          title: question.title,
          type: question.type,
          isMandatory: question.isMandatory ?? false,
          options: question.type === InputSurveyQuestionType.SUBJECT ? undefined : question.options,
        };
      }),
    };

    requestCreateNewSurvey(
      {
        workspaceId,
        surveyData,
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

  /**
   * questionList에 설문을 추가하기 위한 함수
   *
   * 내용은 비어있되, 마지막에 있는 문항과 동일한 type으로 추가합니다.
   */
  const handleAddQuestion = () => {
    const newQuestion: InputSurveyProps = {
      title: '',
      placeholder: '문항의 제목을 입력하세요.',
      visibility: SurveyVisibility.PRIVATE, // 설문 생성 시에는 PRIVATE로 설정
      type: questionList[questionList.length - 1].type, // 마지막으로 선택된 타입을 사용
      options: [''],
      isMandatory: false,
      isEtc: false,
      description: '',
    };
    setQuestionList((prev) => [...prev, newQuestion]);
  };

  /**
   * questionList에 담겨있는, 설문 문항의 속성을 변경하기 위한 1차 함수 (key, value)
   *
   * @param index questionList의 인덱스
   * @param field 설문 문항에서 변경할 key
   * @param value 해당 key에 대해 설문 문항에서 변경할 value
   */
  const handleQuestionPropertyChange = (
    index: number,
    field: keyof InputSurveyProps,
    value: InputSurveyProps[keyof InputSurveyProps],
  ) => {
    setQuestionList((prev) => {
      const updatedQuestions = [...prev];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [field]: value,
      };
      return updatedQuestions;
    });
  };

  /**
   * InputSurvey 컴포넌트에 제공할 Question 관련 handler set
   * @param index questionList의 인덱스
   */
  const handlerSet = (index: number) => {
    return {
      onMovingBarClick: () => console.log('Moving bar clicked for question', index),
      onTitleChange: (title: string) => handleQuestionPropertyChange(index, 'title', title),
      onTypeChange: (type: InputSurveyQuestionType) =>
        handleQuestionPropertyChange(index, 'type', type),
      onToggle: () =>
        handleQuestionPropertyChange(index, 'isMandatory', !questionList[index].isMandatory),
      onDelete: () => setQuestionList((prev) => prev.filter((_, i) => i !== index)),
      onOptionChange: (options: string[]) =>
        handleQuestionPropertyChange(index, 'options', options),
      onDescriptionChange: (description: string) =>
        handleQuestionPropertyChange(index, 'description', description),
      onEtcChange: (isEtc: boolean) => handleQuestionPropertyChange(index, 'isEtc', isEtc),
      onCheck: (checkedOptions: string[]) => {
        console.log('Checked options for question', index, checkedOptions);
      },
      // 체크박스 선택 이벤트 핸들러
    };
  };

  return (
    <div className="mt-24pxr mb-10pxr mx-auto flex w-full flex-col items-center">
      <GnbTop section={GnbSection.CUSTOM} title={surveyTitle} />
      {/*가운데 정렬을 위해서 존재하는 wrapper*/}
      <div className="border-stroke-200 flex w-full justify-center border-b-1">
        {/*상단 제목 + 생성자 + 설문 문항 생성 / 작성 완료*/}
        <div className="w-668pxr mt-24pxr flex flex-col items-start">
          <InputFileTitle value={surveyTitle} />
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
        <AddQuestionButton onClick={handleAddQuestion} className="mb-16pxr" />
        {/*설문 문항들*/}
        <div className="gap-y-14pxr flex flex-col items-center">
          {questionList.map((question, index) => {
            return <InputSurvey key={index} {...question} {...handlerSet(index)} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CreateSurveyPage;
