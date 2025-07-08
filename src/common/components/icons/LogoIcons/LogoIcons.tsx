import { IconsCommonProps } from '@icons/types/icons.common.types';

import LogoIconMixed from '@svgs/logo/LogoMixed.svg';
import LogoIconSymbol from '@svgs/logo/LogoSymbol.svg';
import LogoIconText from '@svgs/logo/LogoText.svg';

import { LogoIconsState } from './LogoIcons.types';

const LogoIcons = ({ state, className }: IconsCommonProps<LogoIconsState>) => {
  switch (state) {
    case LogoIconsState.MIXED:
      return <LogoIconMixed className={className} />;
    case LogoIconsState.SYMBOL:
      return <LogoIconSymbol className={className} />;
    case LogoIconsState.TEXT:
      return <LogoIconText className={className} />;
    default:
      return null;
  }
};

export default LogoIcons;
