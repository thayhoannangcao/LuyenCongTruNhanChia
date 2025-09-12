import type { Meta, StoryObj } from '@storybook/react';
import { IoEllipseOutline } from 'react-icons/io5';
import { LuSendHorizontal } from 'react-icons/lu';
import Stepper from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Common/Stepper',
  component: Stepper,
};
export default meta;
type Story = StoryObj<typeof Stepper>;
const items = [
  {
    icon: <LuSendHorizontal size="24px" />,
    id: 1,
    content: (
      <div className="flex items-center gap-[10px]">
        <div className="text-xl font-semibold">01</div>
        <div className="text-sm font-medium">シーケンスを作成する</div>
      </div>
    ),
    active: true,
    checked: true,
    onClick: () => console.log('clicked'),
  },
  {
    icon: <LuSendHorizontal size="24px" />,
    id: 2,
    content: (
      <div className="flex items-center gap-[10px]">
        <div className="text-xl font-semibold">02</div>
        <div className="text-sm font-medium">
          シーケンスにステップを追加する
        </div>
      </div>
    ),
    active: true,
  },
  {
    icon: <IoEllipseOutline size="24px" />,
    id: 3,
    content: (
      <div className="flex items-center gap-[10px]">
        <div className="text-xl font-semibold">03</div>
        <div className="text-sm font-medium">リードをシーケンスに追加する</div>
      </div>
    ),
    disabled: true,
  },
  {
    icon: <IoEllipseOutline size="24px" />,
    id: 4,
    content: (
      <div className="flex items-center gap-[10px]">
        <div className="text-xl font-semibold">03</div>
        <div className="text-sm font-medium">シーケンスを起動する</div>
      </div>
    ),
    disabled: true,
  },
];

export const StepperCommon: Story = {
  render() {
    return <Stepper data={items} />;
  },
};
