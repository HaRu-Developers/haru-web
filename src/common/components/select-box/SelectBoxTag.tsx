import { useState } from 'react';

import clsx from 'clsx';

interface SelectBoxTagProps {
  onClick?: () => void;
  label?: string;
}

const SelectBoxTag = ({ onClick, label }: SelectBoxTagProps) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    if (onClick) {
      onClick();
    }
  };
  return (
    <button
      className={clsx(
        'text-caption-1 flex h-[30px] items-center justify-center gap-[10px] rounded-[7px] border px-[9px] py-[6px] font-medium',
        {
          'border-primary bg-primary-selected text-black': selected === true,
          'bg-gray-600 text-gray-200': selected === false,
        },
      )}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default SelectBoxTag;
