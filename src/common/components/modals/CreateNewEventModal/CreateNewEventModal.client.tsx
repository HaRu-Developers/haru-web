'use client';

import { useEffect, useState } from 'react';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import ToggleButton from '@common/components/buttons/22px/ToggleButton/ToggleButton.client';
import NextStepButton from '@common/components/buttons/30px/NextStepButton/NextStepButton.client';
import InputChips from '@common/components/inputs/InputChips/InputChips.client';
import InputFieldModal from '@common/components/inputs/modals/InputFieldModal/InputFieldModal.client';
import { useCreateEventConditions } from '@common/components/modals/CreateNewEventModal/useCreateEventConditions';
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
  const [keyword, setKeyword] = useState<string>('');

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
    toggleKeyword,
    toggleFriendTag,
    setPeriod,
    addKeyword,
    changeKeyword,
    removeKeyword,
    setFriendTagRequirement,
    reset,
  } = useCreateEventConditions();

  /**
   * 친구 태그 수 변경 핸들러
   */
  const handleRequiredFriendTagChange = (value: string) => {
    const numberValue = parseInt(value, 10);
    if (!isNaN(numberValue)) {
      // 숫자가 입력된 경우
      setFriendTagRequirement(numberValue);
    } else if (value === '') {
      setFriendTagRequirement(null);
    }
  };

  return (
    <div className="p-24pxr rounded-16pxr w-582pxr shadow-modal flex flex-col items-center justify-center">
      {/* 모달 제목 + 닫기 버튼 */}
      <div className="w-534pxr h-32pxr flex items-center justify-between">
        <CommonText type={CommonTextType.T3_BD_BLACK} text="새로운 이벤트" />
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
        <CommonText type={CommonTextType.T5_SB_BLACK} text="이벤트 당첨 조건" />
        {/* 기본 참여 조건 선택 */}
        <div className="mt-12pxr flex w-full flex-col items-start justify-center">
          <CommonText type={CommonTextType.T6_SB_BLACK} text="기본 참여 조건 선택" />
          <CommonText
            type={CommonTextType.CAP1_RG_GRAY_300}
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
            onToggle={() => {
              setTemporaryDate(null);
              togglePeriod();
            }}
            initialState={conditions.period.isActive}
          />
          <CommonText type={CommonTextType.T6_SB_BLACK} text="참여 기간" />
          <CommonText
            type={CommonTextType.CAP1_RG_GRAY_300}
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
        <div className="mt-12pxr relative flex w-full flex-col items-start justify-center">
          <ToggleButton
            className="absolute top-0 right-0"
            state={conditions.keyword.isActive}
            onToggle={toggleKeyword}
            initialState={conditions.keyword.isActive}
          />
          <CommonText type={CommonTextType.T6_SB_BLACK} text="특정 키워드 포함 여부" />
          <CommonText
            type={CommonTextType.CAP1_RG_GRAY_300}
            text="특정 단어나 해시태그가 포함된 댓글만 선별해 드려요."
            className="mt-3pxr"
          />
          {conditions.keyword.isActive && (
            // <InputFieldModal
            //   placeholder="키워드를 입력해 주세요."
            //   value={keyword}
            //   onChange={setKeyword}
            //   className="mt-8pxr"
            // />
            <InputChips
              placeholder="키워드를 입력해 주세요."
              onChipsChange={changeKeyword}
              className="mt-8pxr"
            />
          )}
        </div>
        {/* 친구 태그 여부 */}
        <div className="mt-12pxr relative flex w-full flex-col items-start justify-center">
          <ToggleButton
            className="absolute top-0 right-0"
            state={conditions.friendTag.isActive}
            onToggle={toggleFriendTag}
            initialState={conditions.friendTag.isActive}
          />
          <CommonText type={CommonTextType.T6_SB_BLACK} text="친구 태그 여부" />
          <CommonText
            type={CommonTextType.CAP1_RG_GRAY_300}
            text="입력한 수 이상의 친구를 태그했는지 확인해 드려요."
            className="mt-3pxr"
          />
          {conditions.friendTag.isActive && (
            <InputFieldModal
              placeholder="수를 입력해 주세요."
              value={conditions.friendTag.requiredFriendTag?.toString() ?? ''}
              onChange={handleRequiredFriendTagChange}
              className="mt-8pxr"
            />
          )}
        </div>
      </div>

      <div className="mt-16pxr flex w-full items-center justify-end">
        <NextStepButton onClick={onNextStep} disabled={true} />
      </div>
    </div>
  );
};

export default CreateNewEventModal;
