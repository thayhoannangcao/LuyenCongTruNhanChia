import type { Meta, StoryObj } from '@storybook/react';
import { IoCheckmarkCircleSharp, IoEllipseOutline } from 'react-icons/io5';
import Timeline from './Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Common/Timeline',
  component: Timeline,
};
export default meta;
type Story = StoryObj<typeof Timeline>;
const items = [
  {
    icon: <IoCheckmarkCircleSharp size="24px" />,
    id: 1,
    content: (
      <div className="flex items-center gap-[10px]">
        <div className="text-xl font-semibold">01</div>
        <div className="text-sm font-medium">Text 1</div>
      </div>
    ),
    active: true,
  },
  {
    icon: <IoCheckmarkCircleSharp size="24px" />,
    id: 2,
    content: (
      <div className="flex items-center gap-[10px]">
        <div className="text-xl font-semibold">02</div>
        <div className="text-sm font-medium">Text 2</div>
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
        <div className="text-sm font-medium">Text 3</div>
      </div>
    ),
    disabled: true,
  },
];

const data = [
  {
    items: items,
  },
];
export const TimelineCommon: Story = {
  render() {
    return <Timeline data={data} />;
  },
};
