import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ComboboxInput } from './ComboboxInput';
import StoryBookNextIntlProvider from '../common/StoryBookNextIntlProvider';

export default {
  title: 'Common/ComboboxInput',
  component: ComboboxInput,
} as Meta<typeof ComboboxInput>;
const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];
export const SingleComboboxInput: StoryObj<typeof ComboboxInput> = {
  render() {
    const [list, setList] = useState<string>('');
    return (
      <StoryBookNextIntlProvider>
        <ComboboxInput
          options={frameworks}
          onSelected={(values) => setList(values as string)}
          values={list ? [list] : undefined}
          placeholder="Select ..."
        />
      </StoryBookNextIntlProvider>
    );
  },
};

export const MultipleComboboxInput: StoryObj<typeof ComboboxInput> = {
  render() {
    const [list, setList] = useState<string[]>([]);
    return (
      <StoryBookNextIntlProvider>
        <ComboboxInput
          options={frameworks}
          onSelected={(values) => setList(values as string[])}
          values={list && [...list]}
          mode="multiple"
          placeholder="Select ..."
        />
      </StoryBookNextIntlProvider>
    );
  },
};
