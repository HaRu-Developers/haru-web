import { Meta, StoryObj } from '@storybook/nextjs';

import LandingTeam from '@features/landing/components/landing-team/LandingTeam/LandingTeam.server';

const meta: Meta<typeof LandingTeam> = {
  title: 'features/landing/landing-team/LandingTeam',
  component: LandingTeam,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LandingTeam>;

export const Default: Story = {
  args: {
    name: '황지원',
    position: 'PM',
    description: '중앙대학교 경영 주전공, 소프트웨어벤처 융합전공',
  },
};
