import clsx from 'clsx';

import { CommonTextProps, CommonTextType } from './CommonText.types';

const CommonText = ({ text, type, className }: CommonTextProps) => {
  switch (type) {
    case CommonTextType.T2_BD:
      return <p className={clsx('text-t2-bd text-black', className)}>{text}</p>;
    case CommonTextType.T3_BD:
      return <p className={clsx('text-t3-bd text-black', className)}>{text}</p>;
    case CommonTextType.T5_SB:
      return <p className={clsx('text-t5-sb text-black', className)}>{text}</p>;
    case CommonTextType.T6_SB:
      return <p className={clsx('text-t6-sb text-black', className)}>{text}</p>;
    case CommonTextType.CAP1_RG:
      return <p className={clsx('text-cap1-rg text-gray-300', className)}>{text}</p>;
    default:
      return <p className={clsx('', className)}>ERR_CHCK_TYPE</p>; // Fallback for any other type
  }
};

export default CommonText;
