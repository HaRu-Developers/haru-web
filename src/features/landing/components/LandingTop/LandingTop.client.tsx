import clsx from 'clsx';

import HaruLogoIcons from '@icons/logos/HaruLogoIcons/HaruLogoIcons';
import { HaruLogoIconsState } from '@icons/logos/HaruLogoIcons/HaruLogoIcons.types';

import CtaSignButton from '../buttons/cta-buttons/CtaSignButton/CtaSignButton.client';
import { LandingTopProps } from './LandingTop.types';

/*
 * 랜딩 페이지의 하루 로고와 로그인 / 회원 가입 부분입니다.
 */

const LandingTop = ({ onLogoClick, onButtonClick, className }: LandingTopProps) => {
  return (
    <div
      className={clsx(
        'py-23pxr bg-landing-bg flex w-full shrink-0 items-center justify-between',
        className,
      )}
    >
      <div onClick={onLogoClick}>
        <HaruLogoIcons
          state={HaruLogoIconsState.MIXED}
          className="w-116pxr h-28pxr cursor-pointer"
        />
      </div>
      <CtaSignButton onClick={onButtonClick} />
    </div>
  );
};

export default LandingTop;
