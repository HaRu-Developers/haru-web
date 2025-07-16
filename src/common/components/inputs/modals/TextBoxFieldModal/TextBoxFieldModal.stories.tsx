/**
 * Modals/새로운 텍스트 필드 모달
 *
 * 다양한 상태와 인터랙션을 보여주는 스토리입니다.
 * 모든 설명은 한국어로 작성해야 합니다.
 */
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import TextBoxFieldModal from './TextBoxFieldModal.client';

const meta: Meta<typeof TextBoxFieldModal> = {
  title: 'Modals/새로운 텍스트 필드 모달',
  component: TextBoxFieldModal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '텍스트 박스 필드가 포함된 모달 컴포넌트입니다. 제목, 플레이스홀더, 값, 변경 이벤트 등을 전달받아 입력을 받을 수 있습니다.',
      },
    },
  },
  argTypes: {
    title: { description: '모달 상단에 표시되는 제목입니다.' },
    placeholder: { description: '입력란의 플레이스홀더 텍스트입니다.' },
    value: { description: '현재 입력된 값입니다.' },
    onChange: { description: '입력값이 변경될 때 호출되는 함수입니다.' },
  },
};

export default meta;
type Story = StoryObj<typeof TextBoxFieldModal>;

// --- 상태: 기본 ---
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextBoxFieldModal {...args} value={value} onChange={setValue} />;
  },
  args: {
    title: '의견을 입력해 주세요',
    placeholder: '여기에 내용을 입력하세요...',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 상태의 텍스트 박스 필드 모달입니다.',
      },
    },
  },
};

// --- 상태: 입력값 있음 ---
export const Filled: Story = {
  render: (args) => {
    const [value, setValue] = useState('초기 입력값');
    return <TextBoxFieldModal {...args} value={value} onChange={setValue} />;
  },
  args: {
    title: '의견을 입력해 주세요',
    placeholder: '여기에 내용을 입력하세요...',
  },
  parameters: {
    docs: {
      description: {
        story: '사용자가 이미 입력한 값이 있을 때의 상태입니다.',
      },
    },
  },
};

// --- 상태: 플레이스홀더만 있음 ---
export const PlaceholderOnly: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextBoxFieldModal {...args} value={value} onChange={setValue} />;
  },
  args: {
    title: '의견을 입력해 주세요',
    placeholder: '예시: 오늘 회의에서 논의한 주요 내용',
  },
  parameters: {
    docs: {
      description: {
        story: '플레이스홀더만 보이는 상태입니다. 입력값은 없습니다.',
      },
    },
  },
};

// --- 상태: 길이 제한 에러 ---
export const Error_LongText: Story = {
  render: (args) => {
    const [value, setValue] = useState('이 텍스트는 아주 길어서 에러가 발생한다고 가정합니다.');
    const maxLen = 20;
    const isError = value.length > maxLen;
    return (
      <div>
        <TextBoxFieldModal {...args} value={value} onChange={setValue} />
        {isError && (
          <p style={{ color: 'red', marginTop: 8 }}>최대 {maxLen}자까지 입력 가능합니다.</p>
        )}
      </div>
    );
  },
  args: {
    title: '의견을 입력해 주세요',
    placeholder: '최대 20자까지 입력',
  },
  parameters: {
    docs: {
      description: {
        story: '입력값이 길이 제한을 초과하여 에러 메시지가 표시되는 상태입니다.',
      },
    },
  },
};

// --- 상태: 로딩 중 ---
export const Loading: Story = {
  render: (args) => {
    return (
      <div>
        <TextBoxFieldModal {...args} value="데이터를 불러오는 중..." onChange={() => {}} />
        <p style={{ color: '#888', marginTop: 8 }}>로딩 중입니다...</p>
      </div>
    );
  },
  args: {
    title: '의견을 입력해 주세요',
    placeholder: '불러오는 중...',
  },
  parameters: {
    docs: {
      description: {
        story: '데이터를 불러오는 중인 상태를 나타냅니다.',
      },
    },
  },
};
