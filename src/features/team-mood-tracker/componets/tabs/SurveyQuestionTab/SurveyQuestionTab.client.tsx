'use client';

import FeatureTabIcons from '@icons/FeatureTabIcons/FeatureTabIcons';
import { FeatureTabIconsState } from '@icons/FeatureTabIcons/FeatureTabIcons.types';

import CategoryOption from '@common/components/CategoryOption/CategoryOption.client';

import IconButton from '@buttons/IconButton/IconButton.client';

import { SurveyQuestionTabLabels } from './SurveyQuestionTab.constants';
import { SurveyQuestionTabProps, SurveyQuestionTabType } from './SurveyQuestionTab.types';

// ✅ 설문 문항 생성
// 작성 완료
// - 현재 탭(surveyQuestionTab)을 '설문 문항 생성' → '설문 문항'으로 변경
// - 작성 완료 버튼 → IconButton으로 바꾸기

// ✅ 설문 문항 생성
// 작성 완료
// - 현재 탭(surveyQuestionTab)을 '설문 문항 생성' → '설문 문항'으로 변경
// - 작성 완료 버튼 → IconButton으로 바꾸기

// ✅ 설문 문항 생성
// 작성 완료
// - 현재 탭(surveyQuestionTab)을 '설문 문항 생성' → '설문 문항'으로 변경
// - 작성 완료 버튼 → IconButton으로 바꾸기

// ✅ 설문 문항 생성
// 작성 완료
// - 현재 탭(surveyQuestionTab)을 '설문 문항 생성' → '설문 문항'으로 변경
// - 작성 완료 버튼 → IconButton으로 바꾸기

// ✅ 설문 문항 생성
// 작성 완료
// - 현재 탭(surveyQuestionTab)을 '설문 문항 생성' → '설문 문항'으로 변경
// - 작성 완료 버튼 → IconButton으로 바꾸기

// ✅ 설문 문항 생성
// 작성 완료
// - 현재 탭(surveyQuestionTab)을 '설문 문항 생성' → '설문 문항'으로 변경
// - 작성 완료 버튼 → IconButton으로 바꾸기

// ✅ 설문 문항 생성
// 작성 완료
// - 현재 탭(surveyQuestionTab)을 '설문 문항 생성' → '설문 문항'으로 변경
// - 작성 완료 버튼 → IconButton으로 바꾸기

// ✅ 설문 문항 생성
// 작성 완료
// - 현재 탭(surveyQuestionTab)을 '설문 문항 생성' → '설문 문항'으로 변경
// - 작성 완료 버튼 → IconButton으로 바꾸기

// ✅ 설문 문항 생성
// 작성 완료
// - 현재 탭(surveyQuestionTab)을 '설문 문항 생성' → '설문 문항'으로 변경
// - 작성 완료 버튼 → IconButton으로 바꾸기

// ✅ 설문 문항 생성
// 작성 완료
// - 현재 탭(surveyQuestionTab)을 '설문 문항 생성' → '설문 문항'으로 변경
// - 작성 완료 버튼 → IconButton으로 바꾸기

const SurveyQuestionTab = ({ survey }: SurveyQuestionTabProps) => {
  const { isSubmitted } = survey;
  const currentTab = isSubmitted
    ? SurveyQuestionTabType.SURVEY_LIST
    : SurveyQuestionTabType.SURVEY_GENERATE;

  const handleSubmit = async () => {
    // 서버로 설문 내용 전송
    console.log('설문 제출 API 호출');
  };

  const handleFileClick = () => {
    console.log('설문 링크 모달 열기');
  };

  return (
    <div className="border-stroke-200 px-266pxr py-13pxr flex h-14 w-300 shrink-0 items-center justify-between border-b border-solid bg-white">
      <CategoryOption label={SurveyQuestionTabLabels[currentTab]} active />
      {isSubmitted ? (
        <IconButton onClick={handleFileClick} ariaLabel="설문 문항 보기">
          <FeatureTabIcons state={FeatureTabIconsState.LINK} />
        </IconButton>
      ) : (
        <button onClick={handleSubmit}>작성 완료</button>
      )}
    </div>
  );
};

export default SurveyQuestionTab;
