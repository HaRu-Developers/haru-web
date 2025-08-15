import { useState } from 'react';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import InputFieldModal from '@common/components/inputs/modals/InputFieldModal/InputFieldModal.client';
import TextBoxFieldModal from '@common/components/inputs/modals/TextBoxFieldModal/TextBoxFieldModal.client';
import CommonText from '@common/components/modals/CommonText/CommonText.client';
import { CommonTextType } from '@common/components/modals/CommonText/CommonText.types';
import DateTimePicker from '@common/components/modals/DateTimePicker/DateTimePicker.client';
import SelectBoxOption from '@common/components/select-box/SelectBoxOption/SelectBoxOption.client';
import { Option } from '@common/components/select-box/SelectBoxOption/SelectBoxOption.types';

import NextStepButton from '@buttons/30px/NextStepButton/NextStepButton.client';

import {
  CreateNewTeamMoodTrackerModalProps,
  TeamMoodTrackerVisibility,
} from '@features/team-mood-tracker/components/modals/CreateNewTeamMoodTrackerModal/CreateNewTeamMoodTrackerModal.types';

const CreateNewTeamMoodTrackerModal = ({
  onClose,
  onNextStep,
}: CreateNewTeamMoodTrackerModalProps) => {
  const [surveyTitle, setSurveyTitle] = useState<string>('');
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [surveyDescription, setSurveyDescription] = useState<string>('');

  const optionList: Option[] = [
    {
      state: TeamMoodTrackerVisibility.PUBLIC,
      label: '전체 공개',
    },
    {
      state: TeamMoodTrackerVisibility.PRIVATE,
      label: '비공개',
    },
  ];

  const [selectedOption, setSelectedOption] = useState<Option>(optionList[0]);

  const handleOptionChange = (val: string) => {
    setSelectedOption(optionList.find((option) => option.state === val) || optionList[0]);
  };

  const handleOnNext = () => {
    if (!selectedDateTime) {
      return;
    }

    onNextStep({
      title: surveyTitle,
      dueDate: selectedDateTime,
      description: surveyDescription,
      visibility: selectedOption.state as TeamMoodTrackerVisibility,
    });
  };

  const isNextStepDisabled = !surveyTitle || !selectedDateTime || !surveyDescription;

  return (
    <div className="p-24pxr rounded-16pxr w-582pxr shadow-modal flex flex-col items-center justify-center bg-white">
      {/* 모달 제목 + 닫기 버튼 */}
      <div className="h-32pxr flex w-full items-center justify-between">
        <CommonText type={CommonTextType.T3_BD_BLACK} text="새로운 팀 분위기 설문" />
        <button className="mr-2pxr" onClick={onClose}>
          <CrossIcons state={CrossIconsState.SIZE_20_GRAY_200} />
        </button>
      </div>
      {/* 설문 제목 */}
      <InputFieldModal
        placeholder="설문의 제목을 입력해 주세요."
        title="설문명"
        value={surveyTitle}
        onChange={setSurveyTitle}
        className="mt-16pxr w-full"
      />
      {/* DateTimePicker */}
      <DateTimePicker
        selectedDateTime={selectedDateTime}
        setSelectedDateTime={setSelectedDateTime}
        datePickerTitle="마감일 설정"
        timePickerTitle="마감 시간 설정"
        className="mt-16pxr w-full"
      />
      {/* 설문 소개 부분 */}
      <TextBoxFieldModal
        placeholder="간단하게 설문을 소개해 주세요."
        title="설문 소개"
        value={surveyDescription}
        onChange={setSurveyDescription}
        className="mt-16pxr"
      />
      {/* 답변 공개 범위 설정 부분 */}
      <div className="mt-24pxr flex w-full justify-between">
        <div className="flex-col items-start justify-center">
          <CommonText type={CommonTextType.T5_SB_BLACK} text="답변 공개 범위 설정" />
          <CommonText
            type={CommonTextType.CAP1_RG_GRAY_300}
            text={
              "'전체 공개' 선택 시, 모든 응답과 리포트 내용이 워크스페이스 내 사람들과 공유돼요."
            }
          />
        </div>
        <SelectBoxOption
          options={optionList}
          initState={optionList[0].state}
          onClick={handleOptionChange}
          className="w-89pxr"
        />
      </div>
      {/* 다음 단계로 버튼 */}
      <div className="mt-16pxr flex w-full items-center justify-end">
        <NextStepButton onClick={handleOnNext} disabled={isNextStepDisabled} />
      </div>
    </div>
  );
};

export default CreateNewTeamMoodTrackerModal;
