import type { Meta, StoryObj } from '@storybook/nextjs';

import RosterList from './RosterList';

const meta: Meta<typeof RosterList> = {
  title: '컴포넌트/RosterList',
  component: RosterList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockItems = [
  { userId: 'SSOXX_A' },
  { userId: 'SSOXX_B' },
  { userId: 'SSOXX_C' },
  { userId: 'SSOXX_D' },
  { userId: 'SSOXX_E' },
];

export const Default: Story = {
  name: '기본 리스트',
  args: {
    items: mockItems,
    hasLeftBorder: false,
    startIndex: 0,
  },
};

export const WithLeftBorder: Story = {
  name: '왼쪽 테두리 적용',
  args: {
    ...Default.args,
    hasLeftBorder: true,
  },
};

export const WithStartIndexLeft: Story = {
  name: '시작 번호가 31인 리스트',
  args: {
    items: mockItems,
    hasLeftBorder: false,
    startIndex: 30,
  },
};

export const WithStartIndex: Story = {
  name: '시작 번호가 31인 오른쪽 리스트',
  args: {
    items: mockItems,
    hasLeftBorder: true,
    startIndex: 30,
  },
};
