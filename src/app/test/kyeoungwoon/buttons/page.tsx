import AddWorkspaceButton from '@common/components/buttons/30px/AddWorkspaceButton/AddWorkspaceButton';
import AddQuestionButton from '@common/components/buttons/56px/AddQuestionButton/AddQuestionButton';
import { SkipForNowButtonType } from '@common/components/buttons/diverse-size/SkipForNowButton/SkipForNowButton.types';

import ChangePasswordButton from '@buttons/30px/ChangePasswordButton/ChangePasswordButton';
import DownloadButton from '@buttons/30px/DownloadButton/DownloadButton';
import EditCompleteButton from '@buttons/30px/EditCompleteButton/EditCompleteButton';
import NextStepButton from '@buttons/30px/NextStepButton/NextStepButton';
import SocialConnectButton from '@buttons/30px/SocialConnectButton/SocialConnectButton';
import WriteCompleteButton from '@buttons/30px/WriteCompleteButton/WriteCompleteButton';
import ArrowButton from '@buttons/32px/ArrowButton/ArrowButton';
import { ArrowButtonDirection } from '@buttons/32px/ArrowButton/ArrowButton.types';
import CompleteSelectButton from '@buttons/32px/CompleteSelectButton/CompleteSelectButton';
import InviteButton from '@buttons/32px/InviteButton/InviteButton';
import StopRecordingButton from '@buttons/32px/StopRecordingButton/StopRecordingButton';
import AccountConnectButton from '@buttons/38px/AccountConnectButton/AccountConnectButton';
import ConfirmEndingRecordButton from '@buttons/38px/ConfirmEndingRecordButton/ConfirmEndingRecordButton';
import DeleteButton from '@buttons/38px/DeleteButton/DeleteButton';
import MoveButton from '@buttons/38px/MoveButton/MoveButton';
import SaveButton from '@buttons/38px/SaveButton/SaveButton';
import SendLinkToTeamByEmailButton from '@buttons/38px/SendLinkToTeamByEmailButton/SendLinkToTeamByEmailButton';
import ConnectInstagramAccountButton from '@buttons/48px/ConnectInstagramAccountButton/ConnectInstagramAccountButton';
import CreateWorkspaceButton from '@buttons/48px/CreateWorkspaceButton/CreateWorkspaceButton';
import GoogleLoginButton from '@buttons/48px/GoogleLoginButton/GoogleLoginButton';
import LoginButton from '@buttons/48px/LoginButton/LoginButton';
import MoveToNextButton from '@buttons/48px/MoveToNextButton/MoveToNextButton';
import { MoveToNextButtonWidth } from '@buttons/48px/MoveToNextButton/MoveToNextButton.types';
import RegisterButton from '@buttons/48px/RegisterButton/RegisterButton';
import CancelButton from '@buttons/diverse-size/CancelButton/CancelButton';
import { CancelButtonType } from '@buttons/diverse-size/CancelButton/CancelButton.types';
import SkipForNowButton from '@buttons/diverse-size/SkipForNowButton/SkipForNowButton';

const ButtonTestPage = () => {
  return (
    <div className="my-3">
      {/* 30px 버튼 */}
      <div className="flex flex-col space-y-4 rounded-4xl border p-5">
        <p className="text-cap3-md">30px 버튼</p>
        <div className="flex flex-row space-x-2">
          <NextStepButton />
          <NextStepButton disabled />
        </div>
        <div className="flex flex-row space-x-2">
          <EditCompleteButton />
        </div>
        <div className="flex flex-row space-x-2">
          <WriteCompleteButton />
        </div>
        <div className="flex flex-row space-x-2">
          <DownloadButton />
        </div>
        <div className="flex flex-row space-x-2">
          <ChangePasswordButton />
          <ChangePasswordButton disabled />
        </div>
        <div className="flex flex-row space-x-2">
          <SocialConnectButton />
          <SocialConnectButton disabled />
        </div>
        <div className="flex flex-row space-x-2">
          <AddWorkspaceButton />
          <AddWorkspaceButton disabled />
        </div>
      </div>

      {/* 32px 버튼 */}
      <div className="mt-5 flex flex-col space-y-4 rounded-4xl border p-5">
        <p className="text-cap3-md">32px 버튼</p>
        <div className="flex flex-row space-x-2">
          <CompleteSelectButton />
          <ArrowButton direction={ArrowButtonDirection.LEFT} />
          <ArrowButton direction={ArrowButtonDirection.RIGHT} />
          <StopRecordingButton />
          <InviteButton />
        </div>
      </div>

      {/* 38px 버튼 */}
      <div className="mt-5 flex flex-col space-y-4 rounded-4xl border p-5">
        <p className="text-cap3-md">38px 버튼</p>
        <div className="flex flex-row space-x-2">
          <DeleteButton />
        </div>
        <div className="flex flex-row space-x-2">
          <ConfirmEndingRecordButton isEndingRecord={true} />
          <ConfirmEndingRecordButton isEndingRecord={false} />
        </div>
        <div className="flex flex-row space-x-2">
          <MoveButton />
          <AccountConnectButton />
        </div>
        <div className="flex flex-row space-x-2">
          <SaveButton />
          <SendLinkToTeamByEmailButton />
        </div>
      </div>

      {/* 48px 버튼 */}
      <div className="mt-5 flex flex-col space-y-4 rounded-4xl border p-5">
        <p className="text-cap3-md">48px 버튼</p>
        <div className="flex flex-row space-x-2">
          <LoginButton />
          <LoginButton disabled />
        </div>
        <div className="flex flex-row space-x-2">
          <RegisterButton />
          <RegisterButton disabled />
        </div>
        <div className="flex flex-row space-x-2">
          <CreateWorkspaceButton />
          <CreateWorkspaceButton disabled />
        </div>
        <div className="flex flex-row space-x-2">
          <MoveToNextButton width={MoveToNextButtonWidth.WIDTH_260} />
          <MoveToNextButton width={MoveToNextButtonWidth.WIDTH_260} disabled />
        </div>

        <div className="flex flex-row space-x-2">
          <MoveToNextButton width={MoveToNextButtonWidth.WIDTH_414} />
          <MoveToNextButton width={MoveToNextButtonWidth.WIDTH_414} disabled />
        </div>
        <div className="flex flex-row space-x-2">
          <GoogleLoginButton />
          <ConnectInstagramAccountButton />
        </div>
      </div>
      {/* 56px 버튼 */}
      <div className="mt-5 flex flex-col space-y-4 rounded-4xl border p-5">
        <p className="text-cap3-md">56px 버튼</p>
        <div className="flex flex-row space-x-2">
          <AddQuestionButton />
        </div>
      </div>
      {/* 같은 버튼이 여러개로 있는 경우 */}
      <div className="mt-5 flex flex-col space-y-4 rounded-4xl border p-5">
        <p className="text-cap3-md">Diverse-sized 버튼</p>
        <div className="flex flex-row space-x-2"></div>
        <div className="flex flex-row space-x-2">
          <CancelButton buttonType={CancelButtonType.SIZE_32} />
          <CancelButton buttonType={CancelButtonType.SIZE_38} />
        </div>
        <div className="flex flex-row space-x-2">
          <SkipForNowButton buttonType={SkipForNowButtonType.SIZE_38} />
          <SkipForNowButton buttonType={SkipForNowButtonType.SIZE_48} />
        </div>
      </div>
      <div className="flex flex-row space-x-2"></div>
      <div className="flex flex-row space-x-2"></div>
      <div className="flex flex-row space-x-2"></div>
      <div className="flex flex-row space-x-2"></div>
    </div>
  );
};

export default ButtonTestPage;
