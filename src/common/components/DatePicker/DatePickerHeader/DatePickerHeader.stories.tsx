import { useState } from 'react';

import type { Meta } from '@storybook/nextjs';

import DatePickerHeader from './DatePickerHeader.client';
import type { DatePickerHeaderProps } from './DatePickerHeader.types';

const meta: Meta<DatePickerHeaderProps> = {
  title: 'Components/DatePicker/DatePickerHeader',
  component: DatePickerHeader,
  tags: ['autodocs'],
};

export default meta;

export const WithRealHandlers = () => {
  const [current, setCurrent] = useState(new Date());

  const handlePrev = () => {
    const prev = new Date(current);
    prev.setMonth(current.getMonth() - 1);
    setCurrent(prev);
  };

  const handleNext = () => {
    const next = new Date(current);
    next.setMonth(current.getMonth() + 1);
    setCurrent(next);
  };

  return <DatePickerHeader current={current} onPrev={handlePrev} onNext={handleNext} />;
};
