import LandingBannerIcons from '@icons/LandingBannerIcons/LandingBannerIcons';
import { LandingBannerIconsState } from '@icons/LandingBannerIcons/LandingBannerIcons.types';
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
const TitleDisplay = () => {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (el.current) {
      const typed = new Typed(el.current, {
        strings: ['소규모 팀을 위한 All-In-One'],
        cursorChar: '',
        typeSpeed: 50,
      });
      return () => {
        typed.destroy();
      };
    }
  }, []);

  return (
    <div className="text-h1-bd relative flex w-full flex-col items-center justify-center whitespace-nowrap">
      <LandingBannerIcons
        state={LandingBannerIconsState.UNDERBAR}
        className="top-76pxr ml-435pxr absolute animate-clip-path-left"
      />
      <span className="text-black" ref={el}></span>
      <div>
        <span className="text-black animate-fade-in-color animate-delay-300">운영 관리 플랫폼, </span>
        <span className="text-primary animate-fade-in-color animate-delay-500">Haru</span>
      </div>
    </div>
  );
};

export default TitleDisplay;
