import NextStepButton from '@/common/components/buttons/30px/NextStepButton';
import { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof NextStepButton> = {
  title: 'Components/NextStepButton',
  component: NextStepButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NextStepButton>;

// 기본 스토리만 정의하고 Controls에서 disabled 상태를 변경
export const Default: Story = {};
