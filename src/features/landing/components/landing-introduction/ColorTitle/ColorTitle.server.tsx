import clsx from 'clsx';

import { ColorTitleProps } from './ColorTitle.types';

const ColorTitle = ({ firstTitle, title, description, className }: ColorTitleProps) => {
  return (
    <div className={clsx('flex flex-col', className)}>
      <div className="text-h4-bd">
        <span className="text-primary">{firstTitle}</span>
        <span className="text-black">{title}</span>
      </div>
      <span className="text-b4-md text-gray-300">{description}</span>
    </div>
  );
};

export default ColorTitle;
