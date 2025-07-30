'use client';

import Image from 'next/image';

import Image404 from '@assets/images/404/image.png';

import CreateWorkspaceButton from '@common/components/buttons/38px/CreateWorkspaceButton/CreateWorkSpaceButton.client';

const NonHaveWorkSpaceMainPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-292pxr flex flex-col">
        <div className="mt-36pxr text-t3-bd mb-16pxr">새로 시작하기</div>
        <div className="w-1030pxr h-534pxr border-stroke-200 rounded-16pxr flex flex-col items-center border border-solid">
          <div className="w-396pxr h-266pxr mt-30pxr mb-36pxr">
            <Image src={Image404} alt="워크스페이스 없음" />
          </div>
          <div className="text-t3-sb mb-8pxr">아직 소속된 워크스페이스가 없어요!</div>
          <div className="mb-18pxr text-b2-rg text-center whitespace-pre-line text-gray-200">{`워크스페이스에 참여하고\n회의 진행, 이벤트 운영, 팀 분위기 설문 등\nHaRu의 다양한 기능을 이용해 보세요!`}</div>
          <CreateWorkspaceButton onClick={() => console.log()} />
        </div>
      </div>
    </div>
  );
};

export default NonHaveWorkSpaceMainPage;
