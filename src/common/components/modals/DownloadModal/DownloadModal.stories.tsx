import type { Meta, StoryObj } from '@storybook/nextjs';

import DownloadModal from './DownloadModal.client';

const meta: Meta<typeof DownloadModal> = {
  title: 'Components/Modals/DownloadModal',
  component: DownloadModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof DownloadModal>;

export const Default: Story = {
  args: {
    onClose: () => console.log('닫기 버튼 클릭'),
    onPdfDownload: () => console.log('PDF 다운로드 클릭'),
    onWordDownload: () => console.log('Word 다운로드 클릭'),
  },
};
