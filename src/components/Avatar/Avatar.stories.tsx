import type { Meta, StoryObj } from '@storybook/react'
import Avatar from './Avatar'

export default {
  title: 'Common/Avatar',
  component: Avatar,
} as Meta<typeof Avatar>

export const CommonAvatar: StoryObj<typeof Avatar> = {
  render() {
    return (
      <div className="bg-neutral-white flex h-24 gap-5 p-6">
        <Avatar />
        <Avatar variant="square" />
        <Avatar variant="rounded" />
        <Avatar badge />
        <Avatar variant="square" badge />
        <Avatar variant="rounded" badge />
      </div>
    )
  },
}
export const StarAvatar: StoryObj<typeof Avatar> = {
  render() {
    return (
      <div className="bg-neutral-white flex h-24 gap-5 p-6">
        <Avatar icon />
        <Avatar icon variant="square" />
        <Avatar icon variant="rounded" />
        <Avatar icon badge />
        <Avatar icon variant="square" badge />
        <Avatar icon variant="rounded" badge />
      </div>
    )
  },
}
export const FallbackAvatar: StoryObj<typeof Avatar> = {
  render() {
    return (
      <div className="bg-neutral-white flex h-24 gap-5 p-6">
        <Avatar imageUrl="test" name="Ts test" />
        <Avatar imageUrl="test" name="Ts test" variant="square" />
        <Avatar imageUrl="test" name="Ts test" variant="rounded" />
        <Avatar imageUrl="test" name="Ts test" badge />
        <Avatar imageUrl="test" name="Ts test" variant="square" badge />
        <Avatar imageUrl="test" name="Ts test" variant="rounded" badge />
      </div>
    )
  },
}
