'use client';

import InputFieldModal from '@common/components/inputs/modals/InputFieldModal/InputFieldModal.client';
import CongratulateSignUpModal from '@common/components/modals/CongratulateSignUpModal/CongratulateSignUpModal.client';
import CreateMeetingMinutesModal from '@common/components/modals/CreateMeetingMinutesModal/CreateMeetingMinutesModal.client';
import CreateNewEventModal from '@common/components/modals/CreateNewEventModal/CreateNewEventModal.client';
import CreateNewTeamMoodTrackerModal from '@common/components/modals/CreateNewTeamMoodTrackerModal/CreateNewTeamMoodTrackerModal.client';
import DeleteModal from '@common/components/modals/DeleteModal/DeleteModal.client';
import { DeleteModalType } from '@common/components/modals/DeleteModal/DeleteModal.types';
import DownloadModal from '@common/components/modals/DownloadModal/DownloadModal.client';
import EndRecordingModal from '@common/components/modals/EndRecordingModal/EndRecordingModal.client';
import LoadingModal from '@common/components/modals/LoadingModal/LoadingModal.client';
import { LoadingModalType } from '@common/components/modals/LoadingModal/LoadingModal.types';
import ProfileSelectModal from '@common/components/modals/ProfileSelectModal/ProfileSelectModal.client';
import ProgressModal from '@common/components/modals/ProgressModal/ProgressModal.client';
import SurveyLinkCreatedModal from '@common/components/modals/SurveyLinkCreatedModal/SurveyLinkCreatedModal.client';

const TestModalsPage = () => {
  const handleDevMode = () => console.log('Something Clicked');
  return (
    <div className="gap-y-30pxr my-50pxr flex flex-col items-center justify-center">
      {/* <div>
        <span>Loading Modal</span>
        <LoadingModal onClose={handleDevMode} />
      </div> */}

      <span className="col-span-3 mb-2 text-center">모달: 삭제</span>
      <div>
        <DownloadModal
          onClose={handleDevMode}
          onPdfDownload={handleDevMode}
          onWordDownload={handleDevMode}
        />
      </div>

      <span className="col-span-3 mb-2 text-center">모달: 다운로드</span>
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        <DeleteModal
          modalType={DeleteModalType.DELETE_REPORT}
          onClose={handleDevMode}
          onAbort={handleDevMode}
          onProceed={handleDevMode}
        />
        <DeleteModal
          modalType={DeleteModalType.DELETE_MEETING_MINUTES}
          onClose={handleDevMode}
          onAbort={handleDevMode}
          onProceed={handleDevMode}
        />
        <DeleteModal
          modalType={DeleteModalType.DELETE_EVENT}
          onClose={handleDevMode}
          onAbort={handleDevMode}
          onProceed={handleDevMode}
        />
        <DeleteModal
          modalType={DeleteModalType.LEAVE_MEETING_RECORD}
          onClose={handleDevMode}
          onAbort={handleDevMode}
          onProceed={handleDevMode}
        />
        <DeleteModal
          modalType={DeleteModalType.CONNECT_INSTAGRAM_ACCOUNT}
          onClose={handleDevMode}
          onAbort={handleDevMode}
          onProceed={handleDevMode}
        />
        <div /> {/* 빈 셀로 2행 3열 맞추기 */}
      </div>
      <span className="col-span-3 mb-2 text-center">모달: 로딩</span>
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        <LoadingModal onClose={handleDevMode} modalType={LoadingModalType.CREATE_SURVEY} />
        <LoadingModal onClose={handleDevMode} modalType={LoadingModalType.MEETING_MINUTES} />
        <LoadingModal onClose={handleDevMode} modalType={LoadingModalType.SNS_EVENT} />
        <ProgressModal progress={1} onClose={handleDevMode} />
        <ProgressModal progress={50} onClose={handleDevMode} />
        <ProgressModal progress={100} onClose={handleDevMode} />
      </div>
      <span className="col-span-3 mb-2 text-center">모달: 녹음 종료</span>
      <div className="">
        <EndRecordingModal
          onClose={handleDevMode}
          onAbort={handleDevMode}
          onProceed={handleDevMode}
        />
      </div>
      <span className="col-span-3 mb-2 text-center">모달: 설문지 생성 완료!</span>
      <div className="">
        <SurveyLinkCreatedModal
          onClose={handleDevMode}
          onEmailSendClick={handleDevMode}
          // surveyLink="https://www.notion.so/From-Plan-to-Design-Feedback-21a5da7802c580609d34d3db20c776ac?d=21a5da7802c5808fb57b001c7edd3ab9#21a5da7802c5800e9307e56709234f9c"
          surveyLink="short link"
        />
      </div>
      <span className="col-span-3 mb-2 text-center">모달: 가입 환영</span>
      <div className="">
        <CongratulateSignUpModal onClose={handleDevMode} onWorkspaceCreate={handleDevMode} />
      </div>
      <span className="col-span-3 mb-2 text-center">모달: 새 파일 생성</span>
      <div className="">
        <CreateMeetingMinutesModal onClose={handleDevMode} onNextStep={handleDevMode} />
      </div>
      <span className="col-span-3 mb-2 text-center">모달: 새로운 이벤트</span>
      <div className=""></div>
      <span className="col-span-3 mb-2 text-center">모달: </span>
      <div className="flex flex-col gap-40">
        <CreateNewEventModal onClose={handleDevMode} onNextStep={handleDevMode} />
        <CreateNewTeamMoodTrackerModal onClose={handleDevMode} onNextStep={handleDevMode} />
        <ProfileSelectModal onClose={handleDevMode} onNextStep={handleDevMode} />
      </div>
      <span className="col-span-3 mb-2 text-center">모달: </span>
      <div className="grid grid-cols-3 grid-rows-2 gap-4"></div>
      <span className="col-span-3 mb-2 text-center">모달: </span>
      <div className="grid grid-cols-3 grid-rows-2 gap-4"></div>
    </div>
  );
};

export default TestModalsPage;
