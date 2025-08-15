'use client'

import { useRouter } from "next/navigation";
import LandingBanner from "../landing-banner/LandingBanner/LandingBanner.client";
import LandingFeature from "../landing-feature/LandingFeature/LandingFeature.client";
import LandingIntroduction from "../landing-introduction/LandingIntroductuion/LandingIntroduction.server";
import LandingNecessity from "../landing-necessity/LandingNecessity/LandingNecessity.server";
import LandingTeam from "../landing-team/LandingTeam/LandingTeam.server";
import LandingStart from "../LandingStart/LandingStart.client";
import LandingTop from "../LandingTop/LandingTop.client"

const LandingFull = () => {
  const className = 'px-120pxr';
  const router = useRouter();
  const handleLoginClick = () => {
    router.push('/auth/login');
  }
  return (
    <>
      <LandingTop className={className} onButtonClick={handleLoginClick} />
      <LandingBanner className={className} />
      <LandingFeature className={className} onClick={handleLoginClick}/>
      <LandingIntroduction className={className} />
      <LandingNecessity className={className} />
      <LandingTeam className={className} />
      <LandingStart className={className} onButtonClick={handleLoginClick}/>
    </>
  )
}

export default LandingFull
