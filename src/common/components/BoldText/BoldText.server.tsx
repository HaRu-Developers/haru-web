import clsx from 'clsx';

import { BoldTextProps } from './BoldText.types';

const BoldText = ({ text, className }: BoldTextProps) => {
  return <p className={clsx('text-t4-bd text-black', className)}>{text}</p>;
};

export default BoldText;
