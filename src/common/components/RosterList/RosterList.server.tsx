import { RosterListProps } from './RosterList.types';
import RosterDataField from './RosterListDataField/RosterListDataField.server';
import RosterListHeader from './RosterListHeader/RosterListHeader.server';

const RosterList = ({ items, hasLeftBorder = false, startIndex = 0 }: RosterListProps) => {
  return (
    <div>
      <RosterListHeader hasLeftBorder={hasLeftBorder} />
      <div>
        {items.map((item, index) => {
          const rowNumber = startIndex + index + 1;
          return (
            <RosterDataField
              key={item.account + index}
              userId={item.account}
              index={index}
              rowNumber={rowNumber}
              hasLeftBorder={hasLeftBorder}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RosterList;
