import HaruLogoIcons from '@icons/logos/HaruLogoIcons/HaruLogoIcons';
import { HaruLogoIconsState } from '@icons/logos/HaruLogoIcons/HaruLogoIcons.types';

import { GnbLeftNavItems } from '@common/constants/gnbs.constants';

import NavItem from './NavItem/NavItem.client';
import RecentDocumentItem from './RecentDocumentItem/RecentDocumentItem.server';
import WorkSpaceProfile from './WorkspaceProfile/WorkspaceProfile.client';

const GnbLeft = () => {
  // 임시 데이터
  const recentDocuments = [
    {
      documentId: '1n',
      title: 'UMC 8기 운영진 회의',
    },
    {
      documentId: '2n',
      title: 'Team-Haru 22차 전사회의',
    },
  ];

  return (
    <div className="border-stroke-200 p-16pxr flex w-60 shrink-0 flex-col border-r border-solid">
      <HaruLogoIcons state={HaruLogoIconsState.MIXED} className="mb-6pxr ml-5pxr h-28pxr w-88pxr" />
      <div className="gap-16pxr flex flex-col">
        <WorkSpaceProfile />
        <div className="rounded-10pxr flex flex-col items-start gap-2 self-stretch">
          {GnbLeftNavItems.map((item) => (
            <NavItem key={item} item={item} />
          ))}
        </div>
        <div className="bg-stroke-200 h-1pxr w-full shrink-0"></div>
      </div>
      <h4 className="text-cap1-md mt-12pxr mb-6pxr ml-12pxr cursor-default text-gray-400">
        recent
      </h4>
      <div className="w-210pxr flex flex-col items-start gap-1">
        {recentDocuments.map((doc) => (
          <RecentDocumentItem key={doc.documentId} documentId={doc.documentId} title={doc.title} />
        ))}
      </div>
    </div>
  );
};

export default GnbLeft;
