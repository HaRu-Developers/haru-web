import { Meta, StoryObj } from '@storybook/nextjs';

import { LandingNecessityIconsState } from '@icons/LandingNecessityIcons/LandingNecessityIcons.types';

import SectionLayout from '@features/landing/components/landing-necessity/SectionLayout/SectionLayout.server';

const meta: Meta<typeof SectionLayout> = {
  title: 'features/landing/landing-team/SectionLayout',
  component: SectionLayout,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SectionLayout>;

export const Graph: Story = {
  args: {
    state: LandingNecessityIconsState.GRAPH,
    title: '운영자 수작업 부담 감소',
    description:
      '기존에 수작업으로 이루어지던 작업을 자동화하여 운영자의 부담을 획기적으로 줄여줍니다.\n또한, 팀의 운영에 필요한 작업들을 신속하게 처리하여 전체 업무 진행 속도를 높여줍니다.',
  },
};

export const Gear: Story = {
  args: {
    state: LandingNecessityIconsState.GEAR,
    title: '휴먼 에러 예방',
    description: '중복 기록, 입력 오류, 누락 등으로 인해 발생하는 문제를 방지해 줍니다.',
  },
};

export const Talk: Story = {
  args: {
    state: LandingNecessityIconsState.TALK,
    title: '팀 내 분위기 향상',
    description:
      '팀원들의 말 하지 못했던 속마음까지도 파악하여\n팀 내 정서적 유대감을 강화하고 더 따뜻한 팀 분위기를 조성해 줍니다.',
  },
};

export const Display: Story = {
  args: {
    state: LandingNecessityIconsState.DISPLAY,
    title: '공정하고 투명한 운영',
    description:
      '팀원들의 말 하지 못했던 속마음까지도 파악하여\n신뢰할 수 있는 AI 기술을 바탕으로, 공정하고 투명한 운영을 가능하게 합니다.',
  },
};
