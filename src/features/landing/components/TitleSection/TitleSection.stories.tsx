import { Meta, StoryObj } from '@storybook/nextjs';

import TitleSection from '@features/landing/components/TitleSection/TitleSection.server';

const meta: Meta<typeof TitleSection> = {
  title: 'features/landing/TitleSection',
  component: TitleSection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TitleSection>;

export const Feature: Story = {
  args: {
    title1: '당신의 하루를 위한 서비스,',
    title2: 'HaRu',
    title3: '의 핵심 기능을 만나 보세요!',
    isSpacing: true,
  },
};

export const Introduction: Story = {
  args: {
    title2: 'HaRu',
    title3: '는 무슨 뜻인가요?',
    isSpacing: false,
  },
};

export const Necessity: Story = {
  args: {
    title2: 'HaRu',
    title3: '가 왜 필요한가요?',
    description: 'HaRu는 모든 팀이 더 가치 있는 순간에 집중할 수 있도록 돕습니다.',
    isSpacing: false,
  },
};

export const Team: Story = {
  args: {
    title1: '팀',
    title2: 'HaRu',
    title3: '를 소개합니다.',
    description: '당신의 하루를 위해, 팀 HaRu가 모였습니다.',
    isSpacing: false,
    className: 'items-center',
  },
};
