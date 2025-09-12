import type { Meta, StoryObj } from '@storybook/react'
import SwitchInput from './SwitchInput'

export default {
  title: 'Common/SwitchInput',
  component: SwitchInput,
} as Meta<typeof SwitchInput>

export const SwitchInputLarge: StoryObj<typeof SwitchInput> = {
  render() {
    return (
      <div className="h-16 bg-neutral-white p-6">
        <SwitchInput label="Label" inputSize="lg" name="large" />
      </div>
    )
  },
}

export const SwitchInputWithFormLabel: StoryObj<typeof SwitchInput> = {
  render() {
    return (
      <div className="h-16 bg-neutral-white p-6">
        <SwitchInput label="Label" name="large" formLabel="Dark mode" />
      </div>
    )
  },
}

export const SwitchInputMedium: StoryObj<typeof SwitchInput> = {
  render() {
    return (
      <div className="h-16 bg-neutral-white p-6">
        <SwitchInput label="Label" name="medium" />
      </div>
    )
  },
}

export const SwitchInputSmall: StoryObj<typeof SwitchInput> = {
  render() {
    return (
      <div className="h-16 bg-neutral-white p-6">
        <SwitchInput label="Label" inputSize="sm" name="small" />
      </div>
    )
  },
}

export const SwitchInputDisabled: StoryObj<typeof SwitchInput> = {
  render() {
    return (
      <div className="h-16 bg-neutral-white p-6">
        <SwitchInput label="Label" disabled />
      </div>
    )
  },
}
