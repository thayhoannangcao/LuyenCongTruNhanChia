import type { Meta, StoryObj } from '@storybook/react';
import { CiSearch } from 'react-icons/ci';
import TextInputCanClear from './TextInputCanClear';
import TextInput from './TextInput';

export default {
  title: 'Common/TextInput',
  component: TextInput,
} as Meta<typeof TextInput>;

export const TextInputLarge: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'Placeholder',
    label: 'Label',
  },
};

export const TextInputMedium: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'Placeholder',
    label: 'Label',
    inputSize: 'md',
  },
};

export const TextInputSmall: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'Placeholder',
    label: 'Label',
    inputSize: 'sm',
  },
};

export const TextInputRequired: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'Placeholder',
    label: 'Label',
    required: true,
  },
};

export const TextInputError: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'Error',
    label: 'Label',
    error: 'Input is required',
    required: true,
  },
};

export const TextInputNumber: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'Placeholder',
    label: 'Label',
    type: 'number',
  },
};

export const TextInputPassword: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'Password',
    label: 'Enter password',
    type: 'password',
  },
};

export const TextInputStartIcon: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'Placeholder',
    label: 'Label',
    startIcon: <CiSearch />,
  },
};

export const TextInputEndIcon: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'Placeholder',
    label: 'Label',
    endIcon: <CiSearch />,
  },
};

export const TextInputDisabled: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'Placeholder',
    label: 'Label',
    disabled: true,
  },
};

export const TextInputClear: StoryObj<typeof TextInput> = {
  render() {
    return <TextInputCanClear />;
  },
};
