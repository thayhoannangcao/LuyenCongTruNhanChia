import type { Meta, StoryObj } from '@storybook/react'
import CardNotification from './CardNotification'
import { CardNotificationStatus } from '@/src/enums/status.enum'

export default {
  title: 'Components/CardNotification',
  component: CardNotification,
} as Meta<typeof CardNotification>

export const Default: StoryObj<typeof CardNotification> = {
  render() {
    return (
      <div>
        <CardNotification
          title="Card Notification Title"
          description="This is a description"
          status={{
            label: 'This is a status',
          }}
        />
      </div>
    )
  },
}

export const CardNotificationVerifying: StoryObj<typeof CardNotification> = {
  render() {
    return (
      <div>
        <CardNotification
          title="Card Notification Verifying"
          description="This is a description"
          status={{
            value: CardNotificationStatus.PENDING,
            label: 'This is a status',
          }}
        />
      </div>
    )
  },
}

export const CardNotificationComplete: StoryObj<typeof CardNotification> = {
  render() {
    return (
      <div>
        <CardNotification
          title="Card Notification Complete"
          description="This is a description"
          status={{
            value: CardNotificationStatus.SUCCESS,
            label: 'This is a status',
          }}
        />
      </div>
    )
  },
}

export const CardNotificationNotVerified: StoryObj<typeof CardNotification> = {
  render() {
    return (
      <div>
        <CardNotification
          title="Card Notification Not Verified"
          description="This is a description"
          status={{
            value: CardNotificationStatus.CANCEL,
            label: 'This is a status',
          }}
        />
      </div>
    )
  },
}

export const Clickable: StoryObj<typeof CardNotification> = {
  render() {
    return (
      <div>
        <CardNotification
          title="Clickable"
          description="This is a description"
          status={{
            value: CardNotificationStatus.PENDING,
            label: 'This is a status',
          }}
          onClick={() => alert('Card Notification clicked!')}
        />
      </div>
    )
  },
}
