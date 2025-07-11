import HaruLogoIcons from '@icons/logos/HaruLogoIcons/HaruLogoIcons';
import { HaruLogoIconsState } from '@icons/logos/HaruLogoIcons/HaruLogoIcons.types';

import FooterLinks from './FooterLinks.client';

const Footer = () => {
  return (
    <div className="h-299pxr gap-120pxr px-114pxr w-full items-start bg-gray-100 py-16">
      <div className="text-b3-rg flex flex-col items-start gap-6 text-white">
        <HaruLogoIcons state={HaruLogoIconsState.MIXED} className="h-43px w-100pxr" />

        <div className="flex flex-col items-start gap-1.5">
          <div className="flex items-center gap-2.5 self-stretch">
            <span>대표 : 황지원</span>
            <span className="h-[15pxr] w-0.5 bg-gray-300" />
            <span>메일 : thejeewon@naver.com</span>
          </div>
          <FooterLinks />
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
