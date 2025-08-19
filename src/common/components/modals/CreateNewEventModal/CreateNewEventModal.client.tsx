'use client';

import { useEffect, useState } from 'react';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import {
  useSnsEventAssistantActions,
  useSnsEventAssistantInfo,
} from '@common/hooks/stores/useSnsEventAssistantStore';

import ToggleButton from '@common/components/buttons/22px/ToggleButton/ToggleButton.client';
import NextStepButton from '@common/components/buttons/30px/NextStepButton/NextStepButton.client';
import InputChips from '@common/components/inputs/InputChips/InputChips.client';
import InputFieldModal from '@common/components/inputs/modals/InputFieldModal/InputFieldModal.client';

import CommonText from '../CommonText/CommonText.client';
import { CommonTextType } from '../CommonText/CommonText.types';
import DateTimePicker from '../DateTimePicker/DateTimePicker.client';
import { CreateNewEventModalProps } from './CreateNewEventModal.types';

/**
 * 새로운 이벤트를 생성할 때 사용하는 모달입니다.
 */
const CreateNewEventModal = ({ onClose, onNextStep }: CreateNewEventModalProps) => {
  const { newTitle, newSnsEventLink, friendTag, winnerCount, keyword, period } =
    useSnsEventAssistantInfo();
  const {
    setNewTitle,
    setNewSnsEventLink,
    changeKeyword,
    setFriendTagRequirement,
    setPeriod,
    setWinnerCount,
    toggleFriendTag,
    toggleKeyword,
    togglePeriod,
  } = useSnsEventAssistantActions();

  const [temporaryDate, setTemporaryDate] = useState<Date | null>(period?.endDate ?? null);

  useEffect(() => {
    if (temporaryDate) {
      setPeriod(temporaryDate);
    }
  }, [temporaryDate, setPeriod]);

  /**
   * 당첨 인원 수 변경 핸들러
   */
  const handleRequiredWinnerCountChange = (value: string) => {
    const numberValue = parseInt(value, 10);
    if (!isNaN(numberValue)) {
      // 숫자가 입력된 경우
      setWinnerCount(numberValue);
    } else if (value === '') {
      setWinnerCount(null);
    }
  };
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

  /**
   *
   */
  const isNextDisabled = () => {
    return (
      !newTitle ||
      !newSnsEventLink ||
      (period.isActive && !temporaryDate) ||
      (friendTag.isActive && friendTag.requiredFriendTag === null) ||
      (keyword.isActive && keyword.keyword.length === 0) ||
      winnerCount === null
    );
  };
  return (
    <div className="p-24pxr rounded-16pxr w-582pxr shadow-modal flex flex-col items-center justify-center bg-white">
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
          value={newTitle}
          onChange={setNewTitle}
        />
        <InputFieldModal
          title="SNS 이벤트 링크"
          placeholder="이벤트의 링크를 입력해 주세요."
          value={newSnsEventLink}
          onChange={setNewSnsEventLink}
        />
      </div>

      {/* 이벤트 조건 설정 */}
      <div className="mt-25pxr gap-y-12pxr flex w-full flex-col items-start justify-center">
        <CommonText type={CommonTextType.T5_SB_BLACK} text="이벤트 당첨 조건" />
        {/* 당첨 인원*/}
        <div className="mt-12pxr flex w-full flex-col items-start justify-center">
          <CommonText type={CommonTextType.T6_SB_BLACK} text="당첨 인원" />
          <CommonText
            type={CommonTextType.CAP1_RG_GRAY_300}
            text="입력한 인원 수만큼 공정하게 추첨해 드려요."
            className="mt-3pxr"
          />
          <div className="gap-x-8pxr mt-8pxr flex w-full flex-row">
            <InputFieldModal
              placeholder="수를 입력해 주세요."
              value={winnerCount?.toString() ?? ''}
              onChange={handleRequiredWinnerCountChange}
            />
          </div>
        </div>

        {/* 참여 기간 */}
        <div className="relative flex w-full flex-col items-start justify-center">
          <ToggleButton
            className="absolute top-0 right-0"
            state={period.isActive}
            onToggle={() => {
              setTemporaryDate(null);
              togglePeriod();
            }}
            initialState={period.isActive}
          />
          <CommonText type={CommonTextType.T6_SB_BLACK} text="참여 기간" />
          <CommonText
            type={CommonTextType.CAP1_RG_GRAY_300}
            text="아래 항목 중 선택한 조건을 만족한 참여자만 수집해 드려요."
            className="mt-3pxr"
          />
          {period.isActive && (
            <DateTimePicker
              selectedDateTime={temporaryDate}
              setSelectedDateTime={setTemporaryDate}
            />
          )}
        </div>
        {/* 특정 키워드 포함 여부 */}
        <div className="relative flex w-full flex-col items-start justify-center">
          <ToggleButton
            className="absolute top-0 right-0"
            state={keyword.isActive}
            onToggle={toggleKeyword}
            initialState={keyword.isActive}
          />
          <CommonText type={CommonTextType.T6_SB_BLACK} text="특정 키워드 포함 여부" />
          <CommonText
            type={CommonTextType.CAP1_RG_GRAY_300}
            text="특정 단어나 해시태그가 포함된 댓글만 선별해 드려요."
            className="mt-3pxr"
          />
          {keyword.isActive && (
            <InputChips
              inputChips={keyword.keyword}
              placeholder="키워드를 입력해 주세요."
              onChipsChange={changeKeyword}
              className="mt-8pxr"
            />
          )}
        </div>
        {/* 친구 태그 여부 */}
        <div className="relative flex w-full flex-col items-start justify-center">
          <ToggleButton
            className="absolute top-0 right-0"
            state={friendTag.isActive}
            onToggle={toggleFriendTag}
            initialState={friendTag.isActive}
          />
          <CommonText type={CommonTextType.T6_SB_BLACK} text="친구 태그 여부" />
          <CommonText
            type={CommonTextType.CAP1_RG_GRAY_300}
            text="입력한 수 이상의 친구를 태그했는지 확인해 드려요."
            className="mt-3pxr"
          />
          {friendTag.isActive && (
            <InputFieldModal
              placeholder="수를 입력해 주세요."
              value={friendTag.requiredFriendTag?.toString() ?? ''}
              onChange={handleRequiredFriendTagChange}
              className="mt-8pxr"
            />
          )}
        </div>
      </div>

      <div className="mt-16pxr flex w-full items-center justify-end">
        <NextStepButton onClick={onNextStep} disabled={isNextDisabled()} />
      </div>
    </div>
  );
};

export default CreateNewEventModal;
