import { IconsCommonProps } from '@icons/types/icons.common.types';

import LogoIconMixed from '@svgs/haru-logo/LogoMixed.svg';
import LogoIconSymbol from '@svgs/haru-logo/LogoSymbol.svg';
import LogoIconText from '@svgs/haru-logo/LogoText.svg';

import { HaruLogoIconsState } from './HaruLogoIcons.types';

const HaruLogoIcons = ({ state, className }: IconsCommonProps<HaruLogoIconsState>) => {
  switch (state) {
    case HaruLogoIconsState.MIXED:
      return <LogoIconMixed className={className} />;
    case HaruLogoIconsState.SYMBOL:
      return <LogoIconSymbol className={className} />;
    case HaruLogoIconsState.TEXT:
      return <LogoIconText className={className} />;
    default:
      return null;
  }
};

export default HaruLogoIcons;
