import { Meta, StoryObj } from '@storybook/nextjs';

import TeamLayout from '@features/landing/components/landing-team/TeamLayout/TeamLayout.server';

const meta: Meta<typeof TeamLayout> = {
  title: 'features/landing/landing-team/TeamLayout',
  component: TeamLayout,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TeamLayout>;

export const Default: Story = {
  args: {
    name: '황지원',
    position: 'PM',
    description: '중앙대학교 경영 주전공, 소프트웨어벤처 융합전공',
  },
};
