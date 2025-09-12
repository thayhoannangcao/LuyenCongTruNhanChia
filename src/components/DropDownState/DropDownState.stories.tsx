import type { Meta, StoryObj } from '@storybook/react';
import DropDownStateBase from './DropDownState';
import Button from '../Button';
import { useState } from 'react';

export default {
  title: 'Common/DropDownState',
  component: DropDownStateBase,
} as Meta<typeof DropDownStateBase>;

export const DropDownState: StoryObj<typeof DropDownStateBase> = {
  render: function DropDownCommonComponent() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <DropDownStateBase
          trigger={<Button>Open</Button>}
          align="start"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          className="text-text-primary"
        >
          <div>Content</div>
          <div className="flex justify-end gap-3 border-t pt-3">
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsOpen(false)}>Apply</Button>
          </div>
        </DropDownStateBase>
      </div>
    );
  },
};
