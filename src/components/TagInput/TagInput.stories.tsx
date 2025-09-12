import type { Meta, StoryObj } from '@storybook/react'

import TagInput from './TagInput'
import { useState } from 'react'

export default {
  title: 'Common/TagInput',
  component: TagInput,
} as Meta<typeof TagInput>

const data = [
  'Durward Reynolds',
  'Kenton Towne',
  'Therese Wunsch',
  'Benedict Kessler',
]

export const TagInputPrimary: StoryObj<typeof TagInput> = {
  render() {
    const [selected, setSelected] = useState<string[]>(data)
    return (
      <>
        <TagInput
          value={selected}
          onChange={setSelected}
          label="Label"
          variant="primary"
        />
      </>
    )
  },
}

export const TagInputLight: StoryObj<typeof TagInput> = {
  render() {
    const [selected, setSelected] = useState<string[]>(data)
    return (
      <>
        <TagInput
          value={selected}
          onChange={setSelected}
          label="Label"
          variant="light"
        />
      </>
    )
  },
}

export const TagInputLarge: StoryObj<typeof TagInput> = {
  render() {
    const [selected, setSelected] = useState<string[]>(data)
    return (
      <>
        <TagInput
          size="lg"
          label="Label"
          value={selected}
          onChange={setSelected}
        />
      </>
    )
  },
}

export const TagInputMedium: StoryObj<typeof TagInput> = {
  render() {
    const [selected, setSelected] = useState<string[]>(data)
    return (
      <>
        <TagInput size="md" value={selected} onChange={setSelected} />
      </>
    )
  },
}

export const TagInputSmall: StoryObj<typeof TagInput> = {
  render() {
    const [selected, setSelected] = useState<string[]>(data)
    return (
      <>
        <TagInput size="sm" value={selected} onChange={setSelected} />
      </>
    )
  },
}

export const UnDuplicate: StoryObj<typeof TagInput> = {
  render() {
    const [selected, setSelected] = useState<string[]>(data)
    return (
      <>
        <TagInput
          value={selected}
          onChange={setSelected}
          duplicateValueCheck={false}
        />
      </>
    )
  },
}

export const MaxTags: StoryObj<typeof TagInput> = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(data)
    return (
      <>
        <TagInput maxTags={5} value={selected} onChange={setSelected} />
      </>
    )
  },
}

export const Limit: StoryObj<typeof TagInput> = {
  render() {
    const [selected, setSelected] = useState<string[]>(data)
    return (
      <>
        <TagInput limit={2} value={selected} onChange={setSelected} />
      </>
    )
  },
}

export const Disable: StoryObj<typeof TagInput> = {
  render: (args) => {
    const [selected, setSelected] = useState<string[]>(data)
    return (
      <>
        <TagInput
          {...args}
          value={selected}
          onChange={setSelected}
          size="md"
          disabled
          className={'mt-2'}
        />
      </>
    )
  },
  args: {},
}

export const HelpText: StoryObj<typeof TagInput> = {
  render() {
    const [selected, setSelected] = useState<string[]>(data)
    return (
      <>
        <TagInput
          helpText="Help text"
          value={selected}
          onChange={setSelected}
        />
      </>
    )
  },
}

export const Errors: StoryObj<typeof TagInput> = {
  render: (args) => {
    const [selected, setSelected] = useState<string[]>(data)
    return (
      <>
        <TagInput
          {...args}
          value={selected}
          onChange={setSelected}
          error="Invalid input"
          className={'mt-2'}
        />
      </>
    )
  },
}
