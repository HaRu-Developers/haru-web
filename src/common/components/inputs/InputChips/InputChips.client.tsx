'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { ChipProps, InputChipsProps } from './InputChips.types';

const Chip = ({ chip }: ChipProps) => {
  return (
    <div className="text-b3-rg h-22pxr rounded-7pxr px-9pxr flex flex-shrink-0 items-center bg-gray-600 text-gray-200">
      <span>{chip}</span>
    </div>
  );
};

const InputChips = ({
  inputValue: propInputValue = '',
  inputChips: propInputChips = [],
  placeholder,
  onChipsChange,
  className,
}: InputChipsProps) => {
  const [value, setValue] = useState<string>(propInputValue);
  const [chips, setChips] = useState<string[]>(propInputChips);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    setValue(value);
  }, [value]);

  useEffect(() => {
    setChips(chips);
  }, [chips]);

  const handleAddChips = () => {
    if (!value.trim()) return;
    if (chips.includes(value.trim())) {
      setValue('');
      return;
    }

    const newChips = [...chips, value.trim()];
    setChips(newChips);
    setValue('');

    onChipsChange?.(newChips);
  };

  const handleRemoveChip = (indexToRemove: number) => {
    const newChips = chips.filter((_, i) => i !== indexToRemove);
    setChips(newChips);

    onChipsChange?.(newChips);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.nativeEvent.isComposing) {
        return;
      }
      handleAddChips();
    }
    if (e.key === 'Backspace' && !value && chips.length > 0) {
      e.preventDefault();
      handleRemoveChip(chips.length - 1);
    }
  };

  return (
    <div
      className={clsx(
        'py-6pxr px-12pxr text-b3-rg rounded-4pxr flex w-full items-center gap-x-1 overflow-x-auto border text-black',
        isFocused ? 'border-stroke-selected border-2' : 'border-gray-400',
        className,
      )}
    >
      {chips.map((email, idx) => (
        <Chip key={idx} chip={email} />
      ))}
      <input
        type="text"
        value={value}
        placeholder={chips.length > 0 ? '' : placeholder}
        onChange={(e) => setValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleInputKeyDown}
        className={clsx('min-w-20 flex-shrink-0 bg-transparent outline-none')}
      />
    </div>
  );
};

export default InputChips;
