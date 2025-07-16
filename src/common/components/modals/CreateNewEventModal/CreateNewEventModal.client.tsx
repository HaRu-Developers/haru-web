'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import { useCreateEventConditions } from '@common/hooks/useCreateEventConditions';

import DatePicker from '@common/components/DatePicker/DatePicker.client';
import { TimePicker } from '@common/components/TimePicker/TimePicker.client';
import ToggleButton from '@common/components/buttons/22px/ToggleButton/ToggleButton.client';
import NextStepButton from '@common/components/buttons/30px/NextStepButton/NextStepButton.client';
import InputFieldModal from '@common/components/inputs/modals/InputFieldModal/InputFieldModal.client';
import SelectBoxTag from '@common/components/select-box/SelectBoxTag/SelectBoxTag.client';

import CommonText from '../CommonText/CommonText.server';
import { CommonTextType } from '../CommonText/CommonText.types';
import DateTimePicker from '../DateTimePicker/DateTimePicker.client';
import { CreateNewEventModalProps } from './CreateNewEventModal.types';

/**
 * 새로운 이벤트를 생성할 때 사용하는 모달입니다.
 */
const CreateNewEventModal = ({ onClose, onNextStep }: CreateNewEventModalProps) => {
  const [eventTitle, setEventTitle] = useState<string>('');
  const [snsEventLink, setSnsEventLink] = useState<string>('');
  const [temporaryDate, setTemporaryDate] = useState<Date | null>(null);
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [timePickerVisible, setTimePickerVisible] = useState<boolean>(false);

  useEffect(() => {
    if (temporaryDate) {
      setPeriod(temporaryDate);
    }
  }, [temporaryDate]);

  const {
    conditions,
    toggleLike,
    toggleFollow,
    togglePeriod,
    // toggleKeyword,
    setPeriod,
    // addKeyword,
    // removeKeyword,
    // setFriendTagRequirement,
  } = useCreateEventConditions();

  return (
    <div className="p-24pxr rounded-16pxr w-582pxr shadow-modal flex flex-col items-center justify-center">
      {/* 모달 제목 + 닫기 버튼 */}
      <div className="w-534pxr h-32pxr flex items-center justify-between">
        <CommonText type={CommonTextType.T3_BD} text="새로운 이벤트" />
        <button className="mr-2pxr" onClick={onClose}>
          <CrossIcons state={CrossIconsState.SIZE_20_GRAY_200} />
        </button>
      </div>

      {/* input field 2개 */}
      <div className="gap-y-16pxr mt-19pxr flex w-full flex-col">
        <InputFieldModal
          title="이벤트명"
          placeholder="이벤트의 제목을 입력해 주세요."
          value={eventTitle}
          onChange={setEventTitle}
        />
        <InputFieldModal
          title="SNS 이벤트 링크"
          placeholder="이벤트의 링크를 입력해 주세요."
          value={snsEventLink}
          onChange={setSnsEventLink}
        />
      </div>

      {/* 이벤트 조건 설정 */}
      <div className="mt-25pxr gap-y-12pxr flex w-full flex-col items-start justify-center">
        <CommonText type={CommonTextType.T5_SB} text="이벤트 당첨 조건" />
        {/* 기본 참여 조건 선택 */}
        <div className="mt-12pxr flex w-full flex-col items-start justify-center">
          <CommonText type={CommonTextType.T6_SB} text="기본 참여 조건 선택" />
          <CommonText
            type={CommonTextType.CAP1_RG}
            text="아래 항목 중 선택한 조건을 만족한 참여자만 수집해 드려요."
            className="mt-3pxr"
          />
          <div className="gap-x-8pxr mt-8pxr flex flex-row">
            <SelectBoxTag
              label="좋아요 여부"
              onClick={toggleLike}
              isSelected={conditions.isLiked}
            />
            <SelectBoxTag
              label="팔로우 여부"
              onClick={toggleFollow}
              isSelected={conditions.isFollowed}
            />
          </div>
        </div>

        {/* 참여 기간 */}
        <div className="mt-12pxr relative flex w-full flex-col items-start justify-center">
          <ToggleButton
            className="absolute top-0 right-0"
            state={conditions.period.isActive}
            onToggle={togglePeriod}
            initialState={conditions.period.isActive}
          />
          <CommonText type={CommonTextType.T6_SB} text="참여 기간" />
          <CommonText
            type={CommonTextType.CAP1_RG}
            text="아래 항목 중 선택한 조건을 만족한 참여자만 수집해 드려요."
            className="mt-3pxr"
          />
          {conditions.period.isActive && (
            <DateTimePicker
              selectedDateTime={temporaryDate}
              setSelectedDateTime={setTemporaryDate}
            />
          )}
        </div>
        {/* 특정 키워드 포함 여부 */}
        {/* 친구 태그 여부 */}
      </div>

      <div className="mt-16pxr flex w-full items-center justify-end">
        <NextStepButton onClick={onNextStep} disabled={true} />
      </div>
    </div>
  );
};

export default CreateNewEventModal;
