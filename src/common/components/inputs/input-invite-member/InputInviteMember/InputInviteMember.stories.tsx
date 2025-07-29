import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/nextjs';

import InputInviteMember from '@common/components/inputs/input-invite-member/InputInviteMember/InputInviteMember.client';

const meta: Meta<typeof InputInviteMember> = {
  title: 'Components/inputs/inputInviteMember',
  component: InputInviteMember,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InputInviteMember>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    const [emails, setEmails] = useState<string[]>([]);

    const handleValueChange = (value: string) => {
      setValue(value);
      console.log(value, '입력값 변경');
    };

    const handleEmailChange = (emails: string[]) => {
      setEmails(emails);
      console.log(emails, '이메일 목록 변경');
    };

    return (
      <InputInviteMember
        title="새로운 팀원 추가하기"
        value={value}
        emails={emails}
        placeholder="초대할 팀원을 입력해주세요."
        onValueChange={handleValueChange}
        onInvite={(emails: string[]) => console.log(emails, '초대 클릭')}
        onEmailsChange={handleEmailChange}
        onRemove={(email: string) => console.log(email, '이메일 제거')}
        className="w-534pxr"
      />
    );
  },
  args: {
    title: '새로운 팀원 추가하기',
    value: '',
    emails: [],
    placeholder: '초대할 팀원을 입력해주세요.',
    onValueChange: (value: string) => console.log(value),
    onInvite: (emails: string[]) => console.log(emails),
    onEmailsChange: (emails: string[]) => console.log(emails),
    onRemove: (email: string) => console.log(email),
  },
};

export const Search: Story = {
  args: {
    title: '새로운 팀원 추가하기',
    value: 'example@email.com',
    placeholder: '초대할 팀원을 입력해주세요.',
    onValueChange: (value: string) => console.log(value),
    onInvite: (emails: string[]) => console.log(emails),
    onEmailsChange: (emails: string[]) => console.log(emails),
  },
};

export const Add: Story = {
  args: {
    title: '새로운 팀원 추가하기',
    emails: ['example1@email.com', 'example2@email.com', 'example3@email.com'],
    value: 'example4@email.com',
    placeholder: '초대할 팀원을 입력해주세요.',
    onValueChange: (value: string) => console.log(value),
    onInvite: (emails: string[]) => console.log(emails),
    onEmailsChange: (emails: string[]) => console.log(emails),
  },
};

export const NoTitle: Story = {
  args: {
    emails: ['example1@email.com', 'example2@email.com', 'example3@email.com'],
    value: 'example4@email.com',
    placeholder: '초대할 팀원을 입력해주세요.',
    onValueChange: (value: string) => console.log(value),
    onInvite: (emails: string[]) => console.log(emails),
    onEmailsChange: (emails: string[]) => console.log(emails),
  },
};

export const pxr534: Story = {
  args: {
    emails: ['example1@email.com', 'example2@email.com', 'example3@email.com'],
    value: 'example4@email.com',
    placeholder: '초대할 팀원을 입력해주세요.',
    onValueChange: (value: string) => console.log(value),
    onInvite: (emails: string[]) => console.log(emails),
    onEmailsChange: (emails: string[]) => console.log(emails),
    className: 'w-534pxr',
  },
};

export const pxr414: Story = {
  args: {
    emails: ['example1@email.com', 'example2@email.com', 'example3@email.com'],
    value: 'example4@email.com',
    placeholder: '초대할 팀원을 입력해주세요.',
    onValueChange: (value: string) => console.log(value),
    onInvite: (emails: string[]) => console.log(emails),
    onEmailsChange: (emails: string[]) => console.log(emails),
    className: 'w-414pxr',
  },
};
