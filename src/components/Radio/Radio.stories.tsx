import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Radio from './Radio';
import { sub } from 'date-fns';

export default {
  title: 'Common/Radio',
  component: Radio,
} as Meta<typeof Radio>;

const optionsFormat = [
  { value: 'test', label: 'test' },
  {
    value: 'test 1',
    label: 'test 1',
    subLabel: 'Save my login details for next time.',
  },
  { value: 'test 2', label: 'test 2', disabled: true },
];

export const CommonRadio: StoryObj<typeof Radio> = {
  render() {
    const [value, setValue] = useState('');
    return (
      <div className="bg-neutral-white h-24 p-6">
        <Radio
          label="Common Radio"
          options={optionsFormat}
          onChange={(valueChoose: string) => setValue(valueChoose)}
          value={value}
        />
      </div>
    );
  },
};

export const HorizontalRadio: StoryObj<typeof Radio> = {
  render() {
    const [value, setValue] = useState('');
    return (
      <div className="bg-neutral-white h-24 p-6">
        <Radio
          label="Horizontal Radio"
          options={optionsFormat}
          onChange={(valueChoose: string) => setValue(valueChoose)}
          value={value}
          orientation="horizontal"
        />
      </div>
    );
  },
};

export const DefaultRadio: StoryObj<typeof Radio> = {
  render() {
    const [value, setValue] = useState('test 2');
    return (
      <div className="bg-neutral-white h-24 p-6">
        <Radio
          label="Default Radio"
          options={optionsFormat}
          onChange={(valueChoose: string) => setValue(valueChoose)}
          value={value}
        />
      </div>
    );
  },
};

export const SubLabelRadio: StoryObj<typeof Radio> = {
  render() {
    const [value, setValue] = useState('test 2');
    const optionsFormatV2 = optionsFormat.map((item) => ({
      ...item,
      subLabel: 'Save my login details for next time.',
    }));
    return (
      <div className="bg-neutral-white h-24 p-6">
        <Radio
          label="Default Radio"
          options={optionsFormatV2}
          onChange={(valueChoose: string) => setValue(valueChoose)}
          value={value}
        />
      </div>
    );
  },
};
