'use client';

import ChangableWorkspaceImage from '@common/components/ChangableWorkspaceImage/ChangableWorkspaceImage.client';
import MoveToNextButton from '@common/components/buttons/48px/MoveToNextButton/MoveToNextButton.client';
import { MoveToNextButtonWidth } from '@common/components/buttons/48px/MoveToNextButton/MoveToNextButton.types';

import { useCreateWorkspaceMutation } from '@features/on-boarding/hooks/mutations/useCreateWorkspaceMutation';
import { useOnboardingActions } from '@features/on-boarding/hooks/stores/useOnBoardingStore';
import { useOnboardingState } from '@features/on-boarding/hooks/stores/useOnBoardingStore';

const OnBoardingImageStep = () => {
  const { setImage, nextStep, setWorkspaceId } = useOnboardingActions();
  const { name, image } = useOnboardingState();

  const { mutate } = useCreateWorkspaceMutation();

  const handleNext = () => {
    mutate(
      { name, image },
      {
        onSuccess: (data) => {
          const newWorkspaceId = data?.result?.workspaceId;

          setWorkspaceId(newWorkspaceId);
          nextStep();
        },
        onError: (error) => {
          console.error('워크스페이스 생성 실패:', error);
        },
      },
    );
  };

  // 임시
  const previewUrlFromServer = null;

  return (
    <div className="flex flex-col">
      <p className="text-t2-bd mb-6pxr whitespace-pre-line">{`워크스페이스의 \n 대표 사진을 등록해 주세요.`}</p>
      <p className="text-b2-rg mb-44pxr text-gray-200">
        아이콘을 클릭해 이미지를 업로드할 수 있어요.
      </p>

      <ChangableWorkspaceImage
        title={name}
        initialPreview={previewUrlFromServer}
        onFileChange={(file) => {
          setImage(file);
        }}
        className="mb-141pxr"
      />

      <MoveToNextButton onClick={handleNext} width={MoveToNextButtonWidth.WIDTH_414} />
    </div>
  );
};

export default OnBoardingImageStep;
