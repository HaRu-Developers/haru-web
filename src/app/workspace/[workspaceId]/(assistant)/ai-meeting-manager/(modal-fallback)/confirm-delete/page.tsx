import ConfirmDeleteMeetingMinutesModalPage from '../../@modal/(.)confirm-delete/page';
import AiMeetingAssistantDefaultPage from '../../page';

// 새로고침이나 직접 접근 시에도 CreateNewMeetingMinutesModalPage 재활용
const CreateNewMeetingStansalonePage = async ({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) => {
  return (
    <>
      <AiMeetingAssistantDefaultPage params={params} />
      <ConfirmDeleteMeetingMinutesModalPage />
    </>
  );
};

export default CreateNewMeetingStansalonePage;
