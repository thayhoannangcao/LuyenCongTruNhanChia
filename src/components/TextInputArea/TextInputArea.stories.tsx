import type { Meta, StoryObj } from '@storybook/react'
import TextInputArea from './TextInputArea'

export default {
  title: 'Common/TextInputArea',
  component: TextInputArea,
} as Meta<typeof TextInputArea>

export const TextInputAreaLarge: StoryObj<typeof TextInputArea> = {
  render() {
    return (
      <div className="bg-neutral-white p-6">
        <TextInputArea
          className="h-[9rem]"
          label="Label"
          placeholder="入力例:

株式会社SalesBox
Irep Co., Ltd

企業名の後に改行を入れてください"
        />
      </div>
    )
  },
}

export const TextInputAreaMedium: StoryObj<typeof TextInputArea> = {
  render() {
    return (
      <div className="bg-neutral-white p-6">
        <TextInputArea label="Label" placeholder="Placeholder" inputSize="md" />
      </div>
    )
  },
}

export const TextInputAreaSmall: StoryObj<typeof TextInputArea> = {
  render() {
    return (
      <div className="bg-neutral-white p-6">
        <TextInputArea label="Label" placeholder="Placeholder" inputSize="sm" />
      </div>
    )
  },
}

export const TextInputAreaRequired: StoryObj<typeof TextInputArea> = {
  render() {
    return (
      <div className="bg-neutral-white p-6">
        <TextInputArea
          label="Label"
          required={true}
          placeholder="Placeholder"
        />
      </div>
    )
  },
}

export const TextInputAreaError: StoryObj<typeof TextInputArea> = {
  render() {
    return (
      <div className="bg-neutral-white p-6">
        <TextInputArea
          label="Label"
          required={true}
          placeholder="Error"
          error="Invalid input"
        />
      </div>
    )
  },
}
