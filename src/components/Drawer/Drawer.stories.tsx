import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '../Button';
import Drawer from './Drawer';

export default {
  title: 'Common/Drawer',
  component: Drawer,
} as Meta<typeof Drawer>;

const drawContent = {
  trigger: <Button title="See info" />,
  title: <div>Specify the number of data acquisitions</div>,
  footer: <Button title="Submit" />,
  header: 'Test',
};

export const DrawerCommon: StoryObj<typeof Drawer> = {
  render() {
    return (
      <Drawer
        footer={drawContent.footer}
        trigger={drawContent.trigger}
        header={drawContent.header}
      >
        <div className="px-6 pt-6">
          ※ If the number of applicable companies exceeds 1,000, the download
          will not proceed. Please adjust the search conditions so that the
          number of applicable companies is 1,000 or less. ※ If the specified
          download quantity exceeds the monthly allowable download quantity, the
          download will not proceed. Please set the download quantity to be
          within the allowable download quantity and then execute. ※ If the data
          already obtained is also included in the search target, it will be
          counted in the number of cases, so please be careful. If you specify
          exclusion of already downloaded data, it can be excluded.
        </div>
      </Drawer>
    );
  },
};
