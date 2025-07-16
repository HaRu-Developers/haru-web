import ToggleButton from '@common/components/buttons/22px/ToggleButton/ToggleButton.client';
import AddWorkspaceButton from '@common/components/buttons/30px/AddWorkspaceButton/AddWorkspaceButton.client';
import ChangePasswordButton from '@common/components/buttons/30px/ChangePasswordButton/ChangePasswordButton.client';
import DownloadButton from '@common/components/buttons/30px/DownloadButton/DownloadButton.client';
import EditCompleteButton from '@common/components/buttons/30px/EditCompleteButton/EditCompleteButton.client';
import NextStepButton from '@common/components/buttons/30px/NextStepButton/NextStepButton.client';
import SocialConnectButton from '@common/components/buttons/30px/SocialConnectButton/SocialConnectButton.client';
import WriteCompleteButton from '@common/components/buttons/30px/WriteCompleteButton/WriteCompleteButton.client';
import ArrowButton from '@common/components/buttons/32px/ArrowButton/ArrowButton.client';
import CompleteSelectButton from '@common/components/buttons/32px/CompleteSelectButton/CompleteSelectButton.client';
import InviteButton from '@common/components/buttons/32px/InviteButton/InviteButton.client';
import StopRecordingButton from '@common/components/buttons/32px/StopRecordingButton/StopRecordingButton.client';
import AccountConnectButton from '@common/components/buttons/38px/AccountConnectButton/AccountConnectButton.client';
import ConfirmEndingRecordButton from '@common/components/buttons/38px/ConfirmEndingRecordButton/ConfirmEndingRecordButton.client';
import DeleteButton from '@common/components/buttons/38px/DeleteButton/DeleteButton.client';
import MoveButton from '@common/components/buttons/38px/MoveButton/MoveButton.client';
import SaveButton from '@common/components/buttons/38px/SaveButton/SaveButton.client';
import SendLinkToTeamByEmailButton from '@common/components/buttons/38px/SendLinkToTeamByEmailButton/SendLinkToTeamByEmailButton.client';
import ConnectInstagramAccountButton from '@common/components/buttons/48px/ConnectInstagramAccountButton/ConnectInstagramAccountButton.client';
import CreateWorkspaceButton from '@common/components/buttons/48px/CreateWorkspaceButton/CreateWorkspaceButton.client';
import GoogleLoginButton from '@common/components/buttons/48px/GoogleLoginButton/GoogleLoginButton.client';
import LoginButton from '@common/components/buttons/48px/LoginButton/LoginButton.client';
import MoveToNextButton from '@common/components/buttons/48px/MoveToNextButton/MoveToNextButton.client';
import RegisterButton from '@common/components/buttons/48px/RegisterButton/RegisterButton.client';
import AddQuestionButton from '@common/components/buttons/56px/AddQuestionButton/AddQuestionButton.client';
import CancelButton from '@common/components/buttons/diverse-size/CancelButton/CancelButton.client';
import SkipForNowButton from '@common/components/buttons/diverse-size/SkipForNowButton/SkipForNowButton.client';
import { SkipForNowButtonType } from '@common/components/buttons/diverse-size/SkipForNowButton/SkipForNowButton.types';

import { ArrowButtonDirection } from '@buttons/32px/ArrowButton/ArrowButton.types';
import { MoveToNextButtonWidth } from '@buttons/48px/MoveToNextButton/MoveToNextButton.types';
import { CancelButtonType } from '@buttons/diverse-size/CancelButton/CancelButton.types';

const ButtonTestPage = () => {
  return (
    <div className="my-3">
      {/* 30px 버튼 */}
      <div className="flex flex-col gap-y-4 rounded-4xl border p-5">
        <p className="text-cap3-md">30px 버튼</p>
        <div className="flex flex-row gap-x-2">
          <NextStepButton />
          <NextStepButton disabled />
        </div>
        <div className="flex flex-row gap-x-2">
          <EditCompleteButton />
        </div>
        <div className="flex flex-row gap-x-2">
          <WriteCompleteButton />
        </div>
        <div className="flex flex-row gap-x-2">
          <DownloadButton />
        </div>
        <div className="flex flex-row gap-x-2">
          <ChangePasswordButton />
          <ChangePasswordButton disabled />
        </div>
        <div className="flex flex-row gap-x-2">
          <SocialConnectButton />
          <SocialConnectButton disabled />
        </div>
        <div className="flex flex-row gap-x-2">
          <AddWorkspaceButton />
          <AddWorkspaceButton disabled />
        </div>
      </div>

      {/* 32px 버튼 */}
      <div className="mt-5 flex flex-col gap-y-4 rounded-4xl border p-5">
        <p className="text-cap3-md">32px 버튼</p>
        <div className="flex flex-row gap-x-2">
          <CompleteSelectButton />
          <ArrowButton direction={ArrowButtonDirection.LEFT} />
          <ArrowButton direction={ArrowButtonDirection.RIGHT} />
          <StopRecordingButton />
          <InviteButton />
        </div>
      </div>

      {/* 38px 버튼 */}
      <div className="mt-5 flex flex-col gap-y-4 rounded-4xl border p-5">
        <p className="text-cap3-md">38px 버튼</p>
        <div className="flex flex-row gap-x-2">
          <DeleteButton />
        </div>
        <div className="flex flex-row gap-x-2">
          <ConfirmEndingRecordButton isEndingRecord={true} />
          <ConfirmEndingRecordButton isEndingRecord={false} />
        </div>
        <div className="flex flex-row gap-x-2">
          <MoveButton />
          <AccountConnectButton />
        </div>
        <div className="flex flex-row gap-x-2">
          <SaveButton />
          <SendLinkToTeamByEmailButton />
        </div>
      </div>

      {/* 48px 버튼 */}
      <div className="mt-5 flex flex-col gap-y-4 rounded-4xl border p-5">
        <p className="text-cap3-md">48px 버튼</p>
        <div className="flex flex-row gap-x-2">
          <LoginButton />
          <LoginButton disabled />
        </div>
        <div className="flex flex-row gap-x-2">
          <RegisterButton />
          <RegisterButton disabled />
        </div>
        <div className="flex flex-row gap-x-2">
          <CreateWorkspaceButton />
          <CreateWorkspaceButton disabled />
        </div>
        <div className="flex flex-row gap-x-2">
          <MoveToNextButton width={MoveToNextButtonWidth.WIDTH_260} />
          <MoveToNextButton width={MoveToNextButtonWidth.WIDTH_260} disabled />
        </div>

        <div className="flex flex-row gap-x-2">
          <MoveToNextButton width={MoveToNextButtonWidth.WIDTH_414} />
          <MoveToNextButton width={MoveToNextButtonWidth.WIDTH_414} disabled />
        </div>
        <div className="flex flex-row gap-x-2">
          <GoogleLoginButton />
          <ConnectInstagramAccountButton />
        </div>
      </div>
      {/* 56px 버튼 */}
      <div className="mt-5 flex flex-col gap-y-4 rounded-4xl border p-5">
        <p className="text-cap3-md">56px 버튼</p>
        <div className="flex flex-row gap-x-2">
          <AddQuestionButton />
        </div>
      </div>
      {/* 같은 버튼이 여러개로 있는 경우 */}
      <div className="mt-5 flex flex-col gap-y-4 rounded-4xl border p-5">
        <p className="text-cap3-md">Diverse-sized 버튼</p>
        <div className="flex flex-row gap-x-2"></div>
        <div className="flex flex-row gap-x-2">
          <CancelButton buttonType={CancelButtonType.SIZE_32} />
          <CancelButton buttonType={CancelButtonType.SIZE_38} />
        </div>
        <div className="flex flex-row gap-x-2">
          <SkipForNowButton buttonType={SkipForNowButtonType.SIZE_38} />
          <SkipForNowButton buttonType={SkipForNowButtonType.SIZE_48} />
        </div>
        {/* <ToggleButton /> */}
      </div>
      <div className="flex flex-row gap-x-2"></div>
      <div className="flex flex-row gap-x-2"></div>
      <div className="flex flex-row gap-x-2"></div>
      <div className="flex flex-row gap-x-2"></div>
    </div>
  );
};

export default ButtonTestPage;
