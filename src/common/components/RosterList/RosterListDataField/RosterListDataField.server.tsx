import { clsx } from 'clsx';

import { RosterDataFieldProps } from './RosterDataField.types';

const RosterDataField = ({
  hasLeftBorder = false,
  userId,
  index,
  rowNumber,
}: RosterDataFieldProps) => {
  const ptClass = index === 0 ? 'pt-4' : 'pt-3';

  return (
    <div
      className={clsx('border-stroke-200 w-83.5 border-b', {
        'border-stroke-200 border-l': hasLeftBorder,
      })}
    >
      <div className={clsx('flex items-start pb-3', ptClass)}>
        <div className={clsx('flex w-full items-center gap-9', { 'pl-4': hasLeftBorder })}>
          <div className="text-b3-rg text-gray-300">{rowNumber}</div>
          <div className="text-b3-md max-w-290pxr truncate text-black">{userId}</div>
        </div>
      </div>
    </div>
  );
};

export default RosterDataField;
