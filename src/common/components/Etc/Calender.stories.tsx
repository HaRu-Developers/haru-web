import { Meta, StoryObj } from '@storybook/nextjs';

import Calender from '@common/components/Etc/Calender';
import { File, FileType } from '@common/components/Etc/Calender.types';

const meta: Meta<typeof Calender> = {
  title: 'Components/Calender',
  component: Calender,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Calender>;

export const WeekendAndFirstDay: Story = {
  args: {
    date: new Date('2023-10-01'),
    files: [
      {
        name: 'UMC 8기 운영진...',
        type: FileType.AI_MANAGER,
      },
    ] as File[],
  },
};

export const WeekdaysANDMANYFILES: Story = {
  args: {
    date: new Date('2023-10-02'),
    files: [
      {
        name: 'UMC 6기 운영진 회의',
        type: FileType.AI_MANAGER,
      },
      {
        name: 'UMC 7기 운영진 회의',
        type: FileType.SNS_ASSIST,
      },
      {
        name: 'UMC 8기 운영진 회의',
        type: FileType.TEAM_MOOD,
      },
      {
        name: 'UMC 9기 운영진 회의',
        type: FileType.AI_MANAGER,
      },
    ] as File[],
  },
};
