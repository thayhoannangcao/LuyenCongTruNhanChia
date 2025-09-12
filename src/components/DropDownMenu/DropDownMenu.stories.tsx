import type { Meta, StoryObj } from '@storybook/react';
import DropDownMenu from './DropDownMenu';
import Button from '../Button';
import { LuTag } from 'react-icons/lu';

export default {
  title: 'Common/DropDownMenu',
  component: DropDownMenu,
} as Meta<typeof DropDownMenu>;

const items = [
  { label: 'Text A', icon: <LuTag /> },
  {
    label: 'Text B',
    icon: <LuTag />,
    subMenu: {
      icon: <LuTag />,
      items: [{ label: 'Text B1' }, { label: 'Text B2' }, { label: 'More...' }],
    },
  },
  { label: 'Text C', disabled: true },
];
export const DropDownCommon: StoryObj<typeof DropDownMenu> = {
  render() {
    return (
      <div>
        <DropDownMenu trigger={<Button>Open</Button>} items={items} />
      </div>
    );
  },
};
