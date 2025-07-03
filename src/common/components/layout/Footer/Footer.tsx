import LogoMixed from '@common/svgs/logo/LogoMixed.svg';

import FooterLinks from './FooterLinks';

const Footer = () => {
  return (
    <div className="h-[299px] w-[1440px] items-start gap-[120px] bg-gray-100 px-[114px] py-16">
      <div className="text-body-2 flex flex-col items-start gap-6 text-white">
        <LogoMixed height="43" width="100" />

        <div className="flex flex-col items-start gap-1.5">
          <div className="flex items-center gap-2.5 self-stretch">
            <span>대표 : 황지원</span>
            <span className="h-[15px] w-[2px] bg-gray-300" />
            <span>메일 : thejeewon@naver.com</span>
          </div>
          <FooterLinks />
        </div>

        <div className="flex w-[122px] flex-col items-start gap-0.5">
          <span>Copyright © HaRu</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
