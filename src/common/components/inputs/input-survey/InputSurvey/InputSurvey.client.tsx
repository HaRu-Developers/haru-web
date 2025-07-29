'use client';

import ButtonsSurvey from '@common/components/inputs/input-survey/ButtonsSurvey/ButtonsSurvey.client';
import InputTitleSurvey from '@common/components/inputs/input-survey/InputTitleSurvey/InputTitleSurvey.client';
import MovingBarSurvey from '@common/components/inputs/input-survey/MovingBarSurvey/MovingBarSurvey.client';
import SelectBoxOption from '@common/components/select-box/SelectBoxOption/SelectBoxOption.client';
import { Option } from '@common/components/select-box/SelectBoxOption/SelectBoxOption.types';

import QuestionSurvey from '../question-survey/QuestionSurvey/QuestionSurvey.client';
import { Type, Visibility } from '../types/input-survey.common.types';
import { InputSurveyProps } from './InputSurvey.types';

const InputSurvey = ({
  title,
  placeholder,
  visibility,
  type,
  optionList = [''],
  description,
  isMandatory, // 추후에 border 색이나 내부적으로 사용할 수도 있을 것 같아 추가
  isEtc = false,
  onMovingBarClick,
  onTitleChange,
  onTypeChange,
  onToggle,
  onDelete,
  onOptionChange,
  onDescriptionChange,
  onEtcChange,
  onCheck,
}: InputSurveyProps) => {
  const selectBoxOptions = [
    { state: Type.CHOICE, label: '객관식 질문' },
    { state: Type.CHECKBOX, label: '체크박스' },
    { state: Type.SUBJECT, label: '주관식 질문' },
  ] as Option[];
  const handleSelectBoxClick = (value: string) => {
    const selectValue = value as Type;
    onTypeChange?.(selectValue);
  };
  return (
    <div className="w-668pxr px-17pxr py-20pxr gap-10pxr rounded-4pxr shadow-survey-form border-stroke-200 relative flex shrink-0 flex-col items-start border-2 bg-white">
      {visibility === Visibility.PRIVATE && (
        <MovingBarSurvey className="absolute top-0 left-0" onClick={onMovingBarClick} />
      )}
      <div className="gap-20pxr flex w-full flex-col items-start">
        {/* 상단 부분 */}
        <div className="w-628pxr flex items-end justify-between">
          <InputTitleSurvey
            title={title}
            onChange={onTitleChange}
            placeholder={placeholder}
            visibility={visibility}
            className={visibility === Visibility.PUBLIC ? 'w-full' : ''} // 하단 stroke 길어지기 위해 사용
          />
          {visibility === Visibility.PRIVATE && (
            <SelectBoxOption
              options={selectBoxOptions}
              initState={type || selectBoxOptions[0].state}
              onClick={handleSelectBoxClick}
              className="w-100pxr"
            />
          )}
        </div>
        <QuestionSurvey
          type={type}
          optionList={optionList}
          isEtc={isEtc}
          visibility={visibility}
          description={description}
          onOptionChange={onOptionChange}
          onEtcChange={onEtcChange}
          onDescriptionChange={onDescriptionChange}
          onCheck={onCheck}
        />
      </div>
      {visibility === Visibility.PRIVATE && (
        <div className="flex w-full justify-end">
          <ButtonsSurvey onDelete={onDelete} onToggle={onToggle} />
        </div>
      )}
    </div>
  );
};

export default InputSurvey;
