import { clsx } from 'clsx';

import { RosterListHeaderProps } from './RosterListHeader.types';

const RosterListHeader = ({ hasLeftBorder = false }: RosterListHeaderProps) => {
  return (
    <div className={clsx('border-stroke-100 w-83.5 border-b-2', { 'border-l': hasLeftBorder })}>
      <div className="flex items-start pb-2">
        <div
          className={clsx('text-cap1-md flex w-full items-center gap-5 text-gray-400', {
            'pl-4': hasLeftBorder,
          })}
        >
          <div>번호</div>
          <div>ID</div>
        </div>
      </div>
    </div>
  );
};

export default RosterListHeader;
