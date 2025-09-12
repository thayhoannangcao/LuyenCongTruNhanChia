import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'
import { IoMdAddCircle } from 'react-icons/io'

export default {
  title: 'Common/Button',
  component: Button,
} as Meta<typeof Button>

export const ButtonPrimary: StoryObj<typeof Button> = {
  render() {
    return (
      <div className="h-24 bg-neutral-white p-6">
        <Button title="Button" variant="main" size="lg" />
      </div>
    )
  },
}
export const ButtonOutline: StoryObj<typeof Button> = {
  render() {
    return (
      <div className="h-24 bg-neutral-white p-6">
        <Button title="Button" variant="outline" size="lg" />
      </div>
    )
  },
}
export const ButtonLarge: StoryObj<typeof Button> = {
  render() {
    return (
      <div className="h-24 bg-neutral-white p-6">
        <Button title="Button" size="lg" />
      </div>
    )
  },
}
export const ButtonMedium: StoryObj<typeof Button> = {
  render() {
    return (
      <div className="h-24 bg-neutral-white p-6">
        <Button title="Button" size="md" />
      </div>
    )
  },
}
export const ButtonSmall: StoryObj<typeof Button> = {
  render() {
    return (
      <div className="h-24 bg-neutral-white p-6">
        <Button title="Button" size="sm" />
      </div>
    )
  },
}

export const ButtonLoading: StoryObj<typeof Button> = {
  render() {
    return (
      <div className="h-24 bg-neutral-white p-6">
        <Button title="Button" size="lg" loading={true} className="w-28" />
      </div>
    )
  },
}

export const ButtonDisable: StoryObj<typeof Button> = {
  render() {
    return (
      <div className="h-24 bg-neutral-white p-6">
        <Button title="Button" size="lg" disable={true} />
      </div>
    )
  },
}

export const ButtonIcon: StoryObj<typeof Button> = {
  render() {
    return (
      <div className="h-24 bg-neutral-white p-6">
        <Button title="Button" size="lg" icon={<IoMdAddCircle />} />
      </div>
    )
  },
}
