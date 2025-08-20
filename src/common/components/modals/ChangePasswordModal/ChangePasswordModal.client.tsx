'use client';

import { useState } from 'react';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import usePostUserPasswordCheck from '@api/user/post/mutations/usePostUserPasswordCheck';

import { ToastType } from '@common/types/toast.types';

import { useToastActions } from '@common/hooks/stores/useToastStore';
import { useUserActions } from '@common/hooks/stores/useUserStore';

import ChangePasswordButton from '@common/components/buttons/30px/ChangePasswordButton/ChangePasswordButton.client';
import { ChangePasswordButtonState } from '@common/components/buttons/30px/ChangePasswordButton/ChangePasswordButton.types';
import InputFieldModal from '@common/components/inputs/modals/InputFieldModal/InputFieldModal.client';

import CommonText from '../CommonText/CommonText.client';
import { CommonTextType } from '../CommonText/CommonText.types';
import { ChangePasswordModalProps } from './ChangePasswordModal.types';

const ChangePasswordModal = ({ onClose, onNextStep }: ChangePasswordModalProps) => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { addToast } = useToastActions();
  const { setPassword } = useUserActions();
  const { mutate: passwordCheck } = usePostUserPasswordCheck();
  const handleSubmit = () => {
    // todo: z로 유효성 검증
    // todo: 비밀번호 비교 api 호출 후 검증
    // Call the changePassword function with the current password and handle the result
    if (currentPassword.length === 0) {
      addToast({
        text: `현재 비밀번호를 입력해주세요.`,
        type: ToastType.ERROR,
        duration: 2000,
      });
      return;
    }
    passwordCheck(
      { requestPassword: currentPassword },
      {
        onSuccess: (data) => {
          if (!data?.result?.isMatched) {
            addToast({
              text: `현재 비밀번호가 올바르지 않습니다.`,
              type: ToastType.ERROR,
              duration: 2000,
            });
            return;
          }
          if (newPassword.length === 0) {
            addToast({
              text: `새로운 비밀번호를 입력해주세요.`,
              type: ToastType.ERROR,
              duration: 2000,
            });
            return;
          }
          if (confirmPassword.length === 0) {
            addToast({
              text: `새로운 비밀번호 확인을 입력해주세요.`,
              type: ToastType.ERROR,
              duration: 2000,
            });
            return;
          }
          if (newPassword !== confirmPassword) {
            addToast({
              text: `새 비밀번호와 확인 비밀번호가 다릅니다.`,
              type: ToastType.ERROR,
              duration: 2000,
            });
            return;
          }
          if (currentPassword === newPassword) {
            addToast({
              text: `현재 비밀번호와 새로운 비밀번호가 동일합니다.`,
              type: ToastType.ERROR,
              duration: 2000,
            });
            return;
          }
          setPassword(newPassword);
          addToast({
            text: `저장을 눌러 비밀번호 변경을 완료해주세요.`,
            type: ToastType.SUCCESS,
            duration: 2000,
          });
          onClose?.();
        },
        onError: () => {
          addToast({
            text: `비밀번호 확인 중 오류가 발생했습니다.`,
            type: ToastType.ERROR,
            duration: 2000,
          });
          return;
        },
      },
    );
  };
  return (
    <div className="w-582pxr rounded-16pxr shadow-modal gap-y-16pxr p-24pxr flex flex-col items-center justify-center bg-white">
      {/* 모달 제목 + 닫기 버튼 */}
      <div className="h-32pxr flex w-full items-center justify-between">
        <CommonText type={CommonTextType.T3_BD_BLACK} text="비밀번호 변경" />
        <button className="mr-2pxr" onClick={onClose}>
          <CrossIcons state={CrossIconsState.SIZE_20_GRAY_200} />
        </button>
      </div>
      {/* 비밀번호 변경 폼 */}
      <InputFieldModal
        title="현재 비밀번호"
        placeholder="현재의 비밀번호를 입력해 주세요."
        type="password"
        value={currentPassword}
        onChange={setCurrentPassword}
      />
      <InputFieldModal
        title="새로운 비밀번호"
        placeholder="새로운 비밀번호를 입력해 주세요."
        type="password"
        value={newPassword}
        onChange={setNewPassword}
      />
      <InputFieldModal
        title="새로운 비밀번호 확인"
        placeholder="새로운 비밀번호를 한 번 더 입력해 주세요."
        type="password"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />
      {/* 저장하기 버튼 */}
      <div className="mt-16pxr flex w-full items-center justify-end">
        <ChangePasswordButton
          onClick={handleSubmit}
          disabled={false}
          state={ChangePasswordButtonState.COLOR_PRIMARY}
        />
      </div>
    </div>
  );
};

export default ChangePasswordModal;
