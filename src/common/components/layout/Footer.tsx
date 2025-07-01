'use client';

import VerticalLine from '@common/svgs/component-set/VerticalLine.svg';
import LogoMixed from '@common/svgs/logo/LogoMixed.svg';

const Footer = () => {
  const handleServiceTermClick = (type: 'terms' | 'privacy') => {
    console.log(`푸터에서 ${type} 클릭됨`);
  };

  return (
    <div className="h-[299px] w-[1440px] items-start gap-[120px] bg-gray-100 px-[114px] py-16">
      <div className="text-body-2 flex flex-col items-start gap-6 text-white">
        <LogoMixed height="43" width="100" />

        <div className="flex flex-col items-start gap-1.5">
          <div className="flex items-center gap-2.5 self-stretch">
            <span>대표 : 황지원</span>
            <VerticalLine height="15" width="2" />
            <span>메일 : thejeewon@naver.com</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span
              className="cursor-pointer hover:underline"
              onClick={() => handleServiceTermClick('terms')}
            >
              서비스이용약관
            </span>
            <span
              className="cursor-pointer hover:underline"
              onClick={() => handleServiceTermClick('privacy')}
            >
              개인정보처리방침
            </span>
          </div>
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
