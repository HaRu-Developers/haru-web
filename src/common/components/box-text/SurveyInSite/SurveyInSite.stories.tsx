import type { Meta, StoryObj } from '@storybook/nextjs';

import SurveyInSite from './SurveyInSite.server';

const meta: Meta<typeof SurveyInSite> = {
  title: 'Components/BoxText/SurveyInSite',
  component: SurveyInSite,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SurveyInSite>;

export const Default: Story = {
  args: {
    title: 'Haru의 제안',
    items: [
      '회의 시간대에 따른 피로를 표현한 응답이 많았습니다. 일정 조정이 필요할 수 있어요.',
      '업무 분담에 대한 응답이 다수 확인되었습니다. 역할 분담 점검을 고려해보세요.',
    ],
  },
};
