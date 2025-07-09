import { Meta, StoryObj } from '@storybook/nextjs';

import InputInviteMember from '@common/components/inputs/InputInviteMember.client';

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

export const Search: Story = {
  args: {
    title: '새로운 팀원 추가하기',
    inputValue: 'example@email.com',
    placeholder: '초대할 팀원을 입력해주세요.',
    onChange: (value) => console.log(value),
  },
};

export const Add: Story = {
  args: {
    title: '새로운 팀원 추가하기',
    inputEmails: ['example1@email.com', 'example2@email.com', 'example3@email.com'],
    inputValue: 'example4@email.com',
    placeholder: '초대할 팀원을 입력해주세요.',
    onChange: (value) => console.log(value),
  },
};
