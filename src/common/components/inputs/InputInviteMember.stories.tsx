import { Meta, StoryObj } from '@storybook/nextjs';

import InputInviteMember from '@common/components/inputs/InputInviteMember';

const meta: Meta<typeof InputInviteMember> = {
  title: 'Components/inputInviteMember',
  component: InputInviteMember,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InputInviteMember>;

export const Default: Story = {
  args: {
    title: '새로운 팀원 추가하기',
    placeholder: '초대할 팀원을 입력해주세요.',
    onChange: (value) => console.log(value),
  },
};
