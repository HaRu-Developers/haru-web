import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/nextjs';

import { FileType } from '@common/types/file-type.enum';

import CalendarFull from '@common/components/etc/calendar/calendar-full/CalendarFull/CalendarFull.client';
import { DocumentList } from '@common/components/etc/calendar/types/calendar.common.types';

const meta: Meta<typeof CalendarFull> = {
  title: 'Components/Etc/Calendar/CalendarFull',
  component: CalendarFull,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CalendarFull>;
export const Default: Story = {
  render: () => {
    const initialStart = new Date('2025-06-29T00:00:00Z');
    const initialEnd = new Date(initialStart);
    initialEnd.setDate(initialStart.getDate() + 34);

    const [startDate, setStartDate] = useState<Date>(initialStart);
    const [endDate, setEndDate] = useState<Date>(initialEnd);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const mockDocuments: DocumentList[] = [
      {
        documentId: 1,
        title: '회의록 - 테스트',
        documentType: FileType.AI_MEETING_MANAGER,
        createdAt: '2025-06-29T00:00:00Z',
      },
    ];
    const [documents, setDocuments] = useState<DocumentList[]>(mockDocuments);

    const handleCalChange = (newStartDate: Date, newEndDate: Date, currentDate: Date) => {
      setStartDate(newStartDate);
      setEndDate(newEndDate);
      setCurrentDate(currentDate);
    };

    const handleFileClick = (id: number) => {
      console.log(`File with id ${id} clicked`);
    };

    return (
      <CalendarFull
        title="캘린더"
        documents={documents}
        startDate={startDate}
        endDate={endDate}
        operatingMonth={7}
        onFileClick={handleFileClick}
      />
    );
  },
};
