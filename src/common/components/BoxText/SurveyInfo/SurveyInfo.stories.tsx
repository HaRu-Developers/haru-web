import type { Meta, StoryObj } from '@storybook/nextjs';

import SurveryInfo from './SurveyInfo.server';

const meta: Meta<typeof SurveryInfo> = {
  title: 'Components/BoxText/SurveryInfo',
  component: SurveryInfo,
  tags: ['autodocs'],
  args: {
    title: 'UMC Ain 지부 워크숍 수요조사',
    content: `안녕하세요, UMC Ain 지부 회장단입니다.
이번 학기 마무리를 맞아 지부원 분들과 함께할 워크숍을 준비하고자 합니다.
워크숍의 구체적인 일정을 기획하는 데 있어, 여러분의 의견을 반영하고자 간단한 수요조사를 진행합니다.
아래의 문항에 솔직하게 응답해 주시면, 모두가 만족할 수 있는 자리를 만들 수 있도록 적극 반영하겠습니다.
소중한 시간 내어주셔서 감사합니다!`,
  },
};

export default meta;

type Story = StoryObj<typeof SurveryInfo>;

export const Default: Story = {};
