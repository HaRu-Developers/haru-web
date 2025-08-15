'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import HaruLogoIcons from '@icons/logos/HaruLogoIcons/HaruLogoIcons';
import { HaruLogoIconsState } from '@icons/logos/HaruLogoIcons/HaruLogoIcons.types';

import { ROUTES } from '@common/constants/routes.constants';

const Footer = () => {
  const { workspaceId } = useParams<{ workspaceId?: string }>();
  return (
    <div className="h-299pxr gap-120pxr px-114pxr w-full items-start bg-gray-100 py-16">
      <div className="text-b3-rg flex flex-col items-start gap-6 text-white">
        <HaruLogoIcons state={HaruLogoIconsState.MIXED} className="h-28px w-115pxr" />

        <div className="flex flex-col items-start gap-1.5">
          <div className="flex items-center gap-2.5 self-stretch">
            <span>대표 : 황지원</span>
            <span className="h-[15pxr] w-0.5 bg-gray-300" />
            <span>메일 : thejeewon@naver.com</span>
          </div>
          {/* 링크 부분 */}
          <div className="flex items-center gap-2.5">
            <Link
              className="cursor-pointer hover:underline"
              href={ROUTES.MODAL.TERMS.SERVICE(workspaceId)}
            >
              서비스이용약관
            </Link>
            <Link
              className="cursor-pointer hover:underline"
              href={ROUTES.MODAL.TERMS.PRIVACY(workspaceId)}
            >
              개인정보처리방침
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-start gap-0.5">
          <span>Copyright © HaRu</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
