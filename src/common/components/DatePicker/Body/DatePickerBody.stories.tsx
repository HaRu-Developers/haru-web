import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import DatePickerBody from './DatePickerBody.client';
import type { DatePickerBodyProps } from './DatePickerBody.types';

const meta: Meta<DatePickerBodyProps> = {
  title: 'Components/DatePicker/DatePickerBody',
  component: DatePickerBody,
  tags: ['autodocs'],
};

export default meta;

const Template = () => {
  // 단일 선택용 Date[] 상태 (최대 1개만 유지)
  const [selectedDates, setSelectedDates] = useState<Date[]>([new Date()]);

  const toggleDate = (date: Date) => {
    const exists = selectedDates.some((d) => d.toDateString() === date.toDateString());
    const updated = exists ? [] : [date];
    setSelectedDates(updated);
    console.log('현재 선택된 날짜:', updated);
  };

  return (
    <div className="bg-white p-4">
      <DatePickerBody
        activeStartDate={new Date(selectedDates[0].getFullYear(), selectedDates[0].getMonth(), 1)}
        selectedDates={selectedDates}
        onChange={toggleDate}
        onActiveStartDateChange={({ activeStartDate }) => {
          console.log('보여지는 시작 월 변경:', activeStartDate);
        }}
      />
    </div>
  );
};

export const Default: StoryObj<DatePickerBodyProps> = {
  render: () => <Template />,
};
