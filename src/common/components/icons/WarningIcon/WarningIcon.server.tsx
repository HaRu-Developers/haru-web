import clsx from 'clsx';

import RawWarningIcon from '@svgs/warning/WarningIcon.svg';

const WarningIcon = ({ className }: { className?: string }) => {
  return <RawWarningIcon className={clsx('w-16pxr h-16pxr', className)} />;
};

export default WarningIcon;
