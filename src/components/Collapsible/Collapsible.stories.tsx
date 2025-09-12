import type { Meta, StoryObj } from '@storybook/react';
import Collapsible from './Collapsible';
import Tag from '../Tag';
import { IoCloseCircleOutline } from 'react-icons/io5';

export default {
  title: 'Common/Collapsible',
  component: Collapsible,
} as Meta<typeof Collapsible>;

const data = {
  items: [
    {
      trigger: 'Keyword',
      content: (
        <div className="text-neutral-dark mt-3 flex flex-col gap-2 px-3">
          <div className="bg-neutral-light rounded-md px-4 py-2">
            Enter AND search keywords
          </div>
          <div className="bg-neutral-light rounded-md px-4 py-2">
            Enter AND search keywords
          </div>
        </div>
      ),
      numberOfValue: 1,
      subContent: (
        <div className="flex gap-3">
          <Tag label="TagCustom" icon={<IoCloseCircleOutline />} />
          <Tag label="TagCustom" icon={<IoCloseCircleOutline />} />
        </div>
      ),
    },
    {
      trigger: (
        <div className="flex items-center justify-center gap-3">
          <p>Description</p>
        </div>
      ),
      content: (
        <div className="text-neutral-dark mt-3 flex flex-col gap-2 px-3">
          <div className="bg-neutral-light rounded-md px-4 py-2">
            Enter AND search keywords
          </div>
          <div className="bg-neutral-light rounded-md px-4 py-2">
            Enter AND search keywords
          </div>
        </div>
      ),
    },
  ],
};

export const CollapsibleSingle: StoryObj<typeof Collapsible> = {
  render() {
    return (
      <div className="bg-neutral-white w-[280px]">
        <Collapsible items={data.items} />
      </div>
    );
  },
};

export const CollapsibleMulti: StoryObj<typeof Collapsible> = {
  render() {
    return (
      <div className="max-w-[280px]">
        <Collapsible
          type="multiple"
          className="bg-neutral-white"
          items={data.items}
        />
      </div>
    );
  },
};
