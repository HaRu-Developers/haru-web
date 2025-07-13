import { RosterListHeaderProps } from './RosterListHeader.types';

const RosterListHeader = ({ hasLeftBorder = false }: RosterListHeaderProps) => {
  return (
    <div
      className={`border-stroke-100 w-83.5 border-b-2 ${hasLeftBorder ? 'border-stroke-100 border-l' : ''}`}
    >
      <div className={`flex items-start pb-2`}>
        <div
          className={`text-cap1-md flex w-full items-center gap-5 text-gray-400 ${hasLeftBorder ? 'pl-4' : ''}`}
        >
          <div>번호</div>
          <div>ID</div>
        </div>
      </div>
    </div>
  );
};

export default RosterListHeader;
