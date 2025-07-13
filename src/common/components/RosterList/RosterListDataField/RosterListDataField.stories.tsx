import type { Meta, StoryObj } from '@storybook/nextjs';

import RosterDataField from './RosterListDataField.server';

// --- Storybook 메타 정보 ---
const meta: Meta<typeof RosterDataField> = {
  title: '컴포넌트/RosterDataField',
  component: RosterDataField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- 개별 아이템 스토리 ---

export const FirstItem: Story = {
  name: '첫 번째 행',
  args: {
    index: 0,
    rowNumber: 1,
    userId: 'SSOXX_FIRST',
    hasLeftBorder: false,
  },
};

export const DefaultItem: Story = {
  name: '기본 행',
  args: {
    index: 1,
    rowNumber: 2,
    userId: 'SSOXX_DEFAULT',
    hasLeftBorder: false,
  },
};

export const WithLeftBorder: Story = {
  name: '왼쪽 테두리가 있는 행',
  args: {
    index: 2,
    rowNumber: 12,
    userId: 'SSOXX_BORDER',
    hasLeftBorder: true,
  },
};

export const LongUserId: Story = {
  args: {
    index: 2,
    rowNumber: 12,
    userId: 'SUPER_LONG_USER_IDENTIFIER_EXCEEDING_290PX_WIDTH_FOR_ELLIPSIS',
    hasLeftBorder: false,
  },
};

export const WithLeftBorderLongUserId: Story = {
  args: {
    index: 2,
    rowNumber: 12,
    userId: 'SUPER_LONG_USER_IDENTIFIER_EXCEEDING_290PX_WIDTH_FOR_ELLIPSIS',
    hasLeftBorder: true,
  },
};
