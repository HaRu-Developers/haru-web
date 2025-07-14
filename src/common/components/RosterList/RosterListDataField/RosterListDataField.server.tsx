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
      className={`border-stroke-200 w-83.5 border-b ${hasLeftBorder ? 'border-stroke-200 border-l' : ''}`}
    >
      <div className={`flex items-start pb-3 ${ptClass}`}>
        <div className={`flex w-full items-center gap-9 ${hasLeftBorder ? 'pl-4' : ''}`}>
          <div className="text-b3-rg text-gray-300">{rowNumber}</div>
          <div className="text-b3-md max-w-290pxr truncate text-black">{userId}</div>
        </div>
      </div>
    </div>
  );
};

export default RosterDataField;
