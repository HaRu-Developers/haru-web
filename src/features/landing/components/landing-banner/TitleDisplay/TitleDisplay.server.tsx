import LandingBannerIcons from '@icons/LandingBannerIcons/LandingBannerIcons';
import { LandingBannerIconsState } from '@icons/LandingBannerIcons/LandingBannerIcons.types';

const TitleDisplay = () => {
  return (
    <div className="text-h1-bd relative flex w-full flex-col items-center justify-center whitespace-nowrap">
      <LandingBannerIcons
        state={LandingBannerIconsState.UNDERBAR}
        className="top-76pxr ml-435pxr absolute"
      />
      <span className="text-black">소규모 팀을 위한 All-In-One</span>
      <div>
        <span className="text-black">운영 관리 플랫폼, </span>
        <span className="text-primary">Haru</span>
      </div>
    </div>
  );
};

export default TitleDisplay;
