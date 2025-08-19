import type { Meta, StoryObj } from '@storybook/nextjs';

import RosterList from './RosterList.server';

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

/**
 * 백엔드에서 userId -> account로 변경 됨
 */

const mockItems = [
  { account: 'SSOXX_A' },
  { account: 'SSOXX_B' },
  { account: 'SSOXX_C' },
  { account: 'SSOXX_D' },
  { account: 'SSOXX_E' },
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

export const WithLongUserId: Story = {
  name: '긴 userId 포함',
  args: {
    items: [
      { account: 'SSOXX_A' },
      { account: 'SSOXX_B' },
      { account: 'THIS_IS_A_SUPER_LONG_USER_IDENTIFIER_TO_TEST_TEXT_TRUNCATION_OVER_290PX_WIDTH' },
      { account: 'SSOXX_D' },
      { account: 'SSOXX_E' },
    ],
    hasLeftBorder: false,
    startIndex: 0,
  },
};
