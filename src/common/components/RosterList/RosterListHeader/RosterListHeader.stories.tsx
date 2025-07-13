import type { Meta, StoryObj } from '@storybook/nextjs';

import RosterListHeader from './RosterListHeader.server';

// --- Storybook 메타 정보 ---
const meta: Meta<typeof RosterListHeader> = {
  title: '컴포넌트/RosterListHeader',
  component: RosterListHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- 개별 스토리 정의 ---

export const Default: Story = {
  name: '기본 헤더',
  args: {
    hasLeftBorder: false,
  },
};

export const WithLeftBorder: Story = {
  name: '왼쪽 테두리 적용',
  args: {
    hasLeftBorder: true,
  },
};
