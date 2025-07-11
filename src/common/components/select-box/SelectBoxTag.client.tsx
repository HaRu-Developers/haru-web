import { useState } from 'react';

import clsx from 'clsx';

const SelectBoxTag = ({ onClick, isSelected = false, onToggle, label }: SelectBoxTagProps) => {
  const [selected, setSelected] = useState<boolean>(isSelected);

  const handleClick = () => {
    const newSelectedState = !selected;
    setSelected(newSelectedState);

    if (onToggle) {
      onToggle(newSelectedState);
    }

    if (onClick) {
      onClick();
    }
  };
  return (
    <button
      className={clsx(
        'text-cap1-md h-30pxr rounded-7pxr px-9pxr flex items-center justify-center gap-2.5 py-1.5',
        {
          'border-primary bg-primary-selected border text-black': selected === true,
          'bg-gray-600 text-gray-200': selected === false,
        },
      )}
      onClick={handleClick}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
};

export default SelectBoxTag;
