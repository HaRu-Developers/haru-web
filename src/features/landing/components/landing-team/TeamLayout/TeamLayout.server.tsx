import clsx from 'clsx';

import { TeamLayoutProps } from './TeamLayout.types';

const TeamLayout = ({ name, position, description, className }: TeamLayoutProps) => {
  return (
    <div
      className={clsx(
        'gap-6pxr w-386pxr border-stroke-200 rounded-8pxr px-24pxr pt-24pxr pb-21pxr flex flex-col items-start border bg-white',
        className,
      )}
    >
      <div className="gap-8pxr flex items-center justify-center">
        <span className="text-t4-bd text-black">{name}</span>
        <span className="text-t6-sb text-gray-300">{position}</span>
      </div>
      <span className="text-b3-rg text-gray-200">{description}</span>
    </div>
  );
};

export default TeamLayout;
