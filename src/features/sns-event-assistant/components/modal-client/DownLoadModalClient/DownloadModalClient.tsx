'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import useCreateSnsEventDownloadMutation from '@api/sns-event-assistant/post/mutations/useCreateSnsEventDownloadMutation';

// import useSnsEventListDownload from '@api/sns-event-assistant/get/queries/useSnsEventListDownload';
import { DownloadFormat, SnsEventAssistantListType } from '@common/types/download.enum.types';
import { ToastType } from '@common/types/toast.types';

import { useToastActions } from '@common/hooks/stores/useToastStore';

import DownloadModal from '@common/components/modals/DownloadModal/DownloadModal.client';

import ModalLayout from '@/common/components/layouts/ModalLayout/ModalLayout.client';

const DownloadModalClient = () => {
  const router = useRouter();
  const { snsEventId } = useParams<{ snsEventId: string }>();
  const searchParams = useSearchParams();

  const { addToast } = useToastActions();
  const listType =
    (searchParams.get('type') as SnsEventAssistantListType) ||
    SnsEventAssistantListType.PARTICIPANT;
  // 현재 POST로 되어있어서 추후에 GET으로 변경 필요
  // const [enabled, setEnabled] = useState(false);
  // useSnsEventListDownload(
  //   {
  //     snsEventId,
  //     listType,
  //     format,
  //   },
  //   {
  //     enabled,
  //     onSuccess: (data) => {
  //       window.open(data.downloadLink, '_blank');
  //       setEnabled(false);
  //     },
  //     onError: (error) => {
  //       alert(`다운로드에 실패했습니다: ${error.message}`);
  //       setEnabled(false);
  //       console.log(snsEventId, listType, format);
  //     },
  //   },
  // );
  const { mutate: snsEvent } = useCreateSnsEventDownloadMutation();

  const handleDownload = (format: DownloadFormat) => {
    snsEvent(
      {
        snsEventId,
        format,
        listType,
      },
      {
        onSuccess: (data) => {
          window.open(data.result.downloadLink, '_blank');
        },
        onError: (error) => {
          addToast({
            text: `다운로드에 실패했습니다: ${error.message}`,
            type: ToastType.ERROR,
          });
        },
      },
    );
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <ModalLayout>
      <DownloadModal
        onClose={handleClose}
        onPdfDownload={() => handleDownload(DownloadFormat.PDF)}
        onWordDownload={() => handleDownload(DownloadFormat.DOCX)}
      />
    </ModalLayout>
  );
};

export default DownloadModalClient;
