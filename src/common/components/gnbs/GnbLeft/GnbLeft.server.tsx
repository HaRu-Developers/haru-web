import HaruLogoIcons from '@icons/logos/HaruLogoIcons/HaruLogoIcons';
import { HaruLogoIconsState } from '@icons/logos/HaruLogoIcons/HaruLogoIcons.types';

import { FileType } from '@common/types/file-type.enum';

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
      documentType: FileType,
      lastOpened: '2025-07-15T16:00:00+09:00',
    },
    {
      documentId: '2n',
      title: 'Team-Haru 22차 전사회의',
      documentType: FileType,
      lastOpened: '2025-07-15T16:00:00+09:00',
    },
    {
      documentId: '3n',
      title: 'Team-Haru 22차 전사회의',
      documentType: FileType,
      lastOpened: '2025-07-15T16:00:00+09:00',
    },
    {
      documentId: '4n',
      title: 'Team-Haru 22차 전사회의',
      documentType: FileType,
      lastOpened: '2025-07-15T16:00:00+09:00',
    },
    {
      documentId: '5n',
      title: 'Team-Haru 22차 전사회의',
      documentType: FileType,
      lastOpened: '2025-07-15T16:00:00+09:00',
    },
  ];

  return (
    <div className="border-stroke-200 p-16pxr flex w-60 shrink-0 flex-col border-r border-solid">
      <HaruLogoIcons state={HaruLogoIconsState.MIXED} className="mb-8pxr mt-5pxr ml-5pxr" />
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
