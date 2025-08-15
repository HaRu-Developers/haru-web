import { Meta, StoryObj } from '@storybook/nextjs';

import { FileType } from '@common/types/file-type.enum';

import BoxedFile from '@common/components/etc/BoxedFile/BoxedFile.client';

const meta: Meta<typeof BoxedFile> = {
  title: 'Components/BoxedFile',
  component: BoxedFile,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BoxedFile>;
const date = new Date();
const title = date.getMonth() + 1 + '월 ' + date.getDate() + '일 회의록';

export const AiManageer: Story = {
  args: {
    title: title,
    lastOpened: new Date().toISOString(),
    documentType: FileType.AI_MEETING_MANAGER,
  },
};
export const SnsAssist: Story = {
  args: {
    title: title,
    lastOpened: new Date().toISOString(),
    documentType: FileType.SNS_EVENT_ASSISTANT,
  },
};
export const TeamMood: Story = {
  args: {
    title: title,
    lastOpened: new Date().toISOString(),
    documentType: FileType.TEAM_MOOD_TRACKER,
  },
};

export const Yesterday: Story = {
  args: {
    title: title,
    lastOpened: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    documentType: FileType.AI_MEETING_MANAGER,
  },
};

export const Image: Story = {
  args: {
    title: title,
    lastOpened: new Date().toISOString(),
    thumbnailUrl:
      'https://cdn.create.microsoft.com/catalog-assets/ko-kr/ad265748-351c-4e2e-939a-1ff919a1a2a0/thumbnails/400/%25EC%25A0%2584%25ED%2586%25B5%25EC%25A0%2581%25EC%259D%25B8-%25EC%2584%259C%25EC%258B%259D%25EC%259D%2598-%25EC%258B%25A0%25EB%25AC%25B8-white-modern-simple-0-1-31b8cf29a5ca.webp',
    documentType: FileType.AI_MEETING_MANAGER,
  },
};
