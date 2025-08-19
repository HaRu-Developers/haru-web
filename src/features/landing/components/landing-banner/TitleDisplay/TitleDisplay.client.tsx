'use client';

import { useEffect, useRef } from 'react';

import Typed from 'typed.js';

import LandingBannerIcons from '@icons/LandingBannerIcons/LandingBannerIcons';
import { LandingBannerIconsState } from '@icons/LandingBannerIcons/LandingBannerIcons.types';

const TitleDisplay = () => {
  const el1 = useRef<HTMLSpanElement>(null);
  const el2 = useRef<HTMLSpanElement>(null);
  const el3 = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    let typed1: Typed | undefined;
    let typed2: Typed | undefined;
    let typed3: Typed | undefined;

    const createTyped3 = () => {
      if (el3.current) {
        typed3 = new Typed(el3.current, {
          strings: ['HaRu'],
          cursorChar: '',
          typeSpeed: 30,
        });
      }
    }

    const createTyped2 = () => {
      if (el2.current) {
        typed2 = new Typed(el2.current, {
          strings: ['운영 관리 플랫폼,'],
          cursorChar: '',
          typeSpeed: 30,
          onComplete: createTyped3,
        });
      }
    }

    if (el1.current) {
      typed1 = new Typed(el1.current, {
        strings: ['소규모 팀을 위한 All-In-One'],
        cursorChar: '',
        typeSpeed: 30,
        onComplete: createTyped2,
      });
      return () => {
        if (typed1) typed1.destroy();
        if (typed2) typed2.destroy();
        if (typed3) typed3.destroy();
      };
    }
  }, []);

  return (
    <div className="text-h1-bd relative flex w-full flex-col items-center justify-center whitespace-nowrap">
      <LandingBannerIcons
        state={LandingBannerIconsState.UNDERBAR}
        className="top-76pxr ml-435pxr animate-clip-path-left absolute"
      />
      <span className="h-84pxr text-black" ref={el1}></span>
      <div>
        <span className="text-black" ref={el2}>
        </span>
        <span className="pl-8pxr text-primary" ref={el3}></span>
      </div>
    </div>
  );
};

export default TitleDisplay;
