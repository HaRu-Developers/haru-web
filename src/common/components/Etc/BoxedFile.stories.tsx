import { Meta, StoryObj } from '@storybook/nextjs';

import BoxedFile from './BoxedFile';
import { FileType } from './BoxedFile.types';

const meta: Meta<typeof BoxedFile> = {
  title: 'Components/BoxedFile',
  component: BoxedFile,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BoxedFile>;
export const AiManageer: Story = {
  args: {
    fileType: FileType.AI_MANAGER,
  },
};
export const SnsAssist: Story = {
  args: {
    fileType: FileType.SNS_ASSIST,
  },
};
export const TeamMood: Story = {
  args: {
    fileType: FileType.TEAM_MOOD,
  },
};
