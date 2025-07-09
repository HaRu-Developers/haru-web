import IndividualIcons from '@icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@icons/IndividualIcons/IndividualIcons.types';

import { HumanIconWithTextProps } from './HumanIconWithText.types';

const HumanIconWithText = ({ text, className }: HumanIconWithTextProps) => (
  <div className={`text-b3-rg flex items-center text-gray-200 ${className}`}>
    <IndividualIcons state={IndividualIconsState.GROUP} className="mr-0.5" />
    <span>{text}</span>
  </div>
);

export default HumanIconWithText;
