import DownloadButton from '@/common/components/buttons/30px/DownloadButton';
import EditCompleteButton from '@/common/components/buttons/30px/EditCompleteButton';
import NextStepButton from '@/common/components/buttons/30px/NextStepButton';
import WriteCompleteButton from '@/common/components/buttons/30px/WriteCompleteButton';
import ArrowButton from '@/common/components/buttons/32px/ArrowButton';
import Cancel32pxButton from '@/common/components/buttons/32px/Cancel32pxButton';
import CompleteSelectButton from '@/common/components/buttons/32px/CompleteSelectButton';
import StopRecordingButton from '@/common/components/buttons/32px/StopRecordingButton';
import Cancel38pxButton from '@/common/components/buttons/38px/Cancel38pxButton';
import ConfirmEndingRecord from '@/common/components/buttons/38px/ConfirmEndingRecord';
import DeleteButton from '@/common/components/buttons/38px/DeleteButton';
import LoginButton from '@/common/components/buttons/48px/LoginButton';
import NavigateToMainButton from '@/common/components/buttons/48px/NavigateToMainButton';
import RegisterButton from '@/common/components/buttons/48px/RegisterButton';
import AddQuestionButton from '@/common/components/buttons/56px/AddQuestionButton';

const TestPage = () => {
  return (
    <div className="space-y-4 p-8">
      <p className="text-headline-1 text-system-red">줄바꿈이 자연스러운 한국어 문단</p>
      <button className="text-button-1 bg-gradient-primary rounded px-4 py-2 text-white">
        버튼 스타일 테스트
      </button>
      <button className="text-button-1 rounded bg-gray-100 px-4 py-2 text-white">
        버튼 스타일 테스트
      </button>
      <br />
      <NextStepButton isActive={true} />
      <br />
      <NextStepButton isActive={false} />
      <br />
      <EditCompleteButton />
      <br />
      <WriteCompleteButton />
      <br />
      <DownloadButton />
      <br />
      <Cancel32pxButton
        onClick={() => {
          console.log('cancel');
        }}
      />
      <br />
      <CompleteSelectButton
        onClick={() => {
          console.log('complete');
        }}
      />
      <br />
      <ArrowButton direction="LEFT" />
      <ArrowButton direction="RIGHT" />
      <br />
      <StopRecordingButton />
      <br />
      <Cancel38pxButton />
      <br />
      <ConfirmEndingRecord isEndingRecord={true} />
      <ConfirmEndingRecord isEndingRecord={false} />
      <br />
      <DeleteButton />
      <br />
      <LoginButton isActive={true} />
      <LoginButton isActive={false} />
      <br />
      <RegisterButton isActive={true} />
      <RegisterButton isActive={false} />
      <br />
      <NavigateToMainButton isActive={true} />
      <NavigateToMainButton isActive={false} />
      <br />
      <AddQuestionButton />
      <br />
    </div>
  );
};

export default TestPage;
