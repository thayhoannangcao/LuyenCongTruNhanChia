import Tabs from './Tabs';
import type { Meta, StoryObj } from '@storybook/react';
import { Search } from 'lucide-react';

export default {
  title: 'Common/Tabs',
  component: Tabs,
} as Meta<typeof Tabs>;

const test = {
  defaultValue: 'company',
  tabsList: [
    {
      label: 'COMPANY',
      value: 'company',
      content: 'Company content',
    },
    {
      label: 'CONTACT',
      value: 'contact',
      content: 'Contact content',
    },
  ],
};

export const TabsUnderline: StoryObj<typeof Tabs> = {
  render(args) {
    return (
      <Tabs
        {...args}
        defaultValue={test.defaultValue}
        numberOfValuePosition="bottom"
        iconPosition="top"
        tabsList={test.tabsList}
      />
    );
  },
};

export const TabsFilled: StoryObj<typeof Tabs> = {
  render(args) {
    return (
      <Tabs
        {...args}
        defaultValue={test.defaultValue}
        tabsList={test.tabsList}
        variant="filled"
      />
    );
  },
};

export const TabsLarge: StoryObj<typeof Tabs> = {
  render(args) {
    return (
      <Tabs
        {...args}
        defaultValue={test.defaultValue}
        tabsList={test.tabsList}
        size="lg"
      />
    );
  },
};

export const TabsMedium: StoryObj<typeof Tabs> = {
  render(args) {
    return (
      <Tabs
        {...args}
        defaultValue={test.defaultValue}
        tabsList={test.tabsList}
        size="md"
      />
    );
  },
};

export const TabsSmall: StoryObj<typeof Tabs> = {
  render(args) {
    return (
      <Tabs
        {...args}
        defaultValue={test.defaultValue}
        tabsList={test.tabsList}
        size="sm"
      />
    );
  },
};

const exampleDisable = {
  defaultValue: 'company',
  tabsList: [
    {
      label: 'COMPANY',
      value: 'company',
      content: 'Company content',
    },
    {
      label: 'CONTACT',
      value: 'contact',
      content: 'Contact content',
      disabled: true,
    },
  ],
};

export const TabsDisabled: StoryObj<typeof Tabs> = {
  render(args) {
    return (
      <Tabs
        {...args}
        defaultValue={exampleDisable.defaultValue}
        tabsList={exampleDisable.tabsList}
      />
    );
  },
};

const exampleNumberOfValue = {
  defaultValue: 'company',
  tabsList: [
    {
      label: 'COMPANY',
      value: 'company',
      content: 'Company content',
      numberOfValue: 1,
    },
    {
      label: 'CONTACT',
      value: 'contact',
      content: 'Contact content',
      numberOfValue: 2,
    },
  ],
};

export const TabsNumberValue: StoryObj<typeof Tabs> = {
  render(args) {
    return (
      <Tabs
        {...args}
        defaultValue={test.defaultValue}
        tabsList={exampleNumberOfValue.tabsList}
        numberOfValuePosition="bottom"
      />
    );
  },
};

const exampleTabsIcon = {
  defaultValue: 'company',
  tabsList: [
    {
      label: 'COMPANY',
      value: 'company',
      content: 'Company content',
      icon: <Search />,
      numberOfValue: 0,
    },
    {
      label: 'CONTACT',
      value: 'contact',
      content: 'Contact content',
    },
  ],
};

export const TabsIcon: StoryObj<typeof Tabs> = {
  render(args) {
    return (
      <Tabs
        {...args}
        defaultValue={test.defaultValue}
        tabsList={exampleTabsIcon.tabsList}
      />
    );
  },
};
