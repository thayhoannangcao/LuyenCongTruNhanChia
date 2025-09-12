import type { Meta, StoryObj } from '@storybook/react'
import Checkbox from './Checkbox'

export default {
  title: 'Common/Checkbox',
  component: Checkbox,
} as Meta<typeof Checkbox>

export const CommonCheckbox: StoryObj<typeof Checkbox> = {
  render() {
    return (
      <div className="flex h-24 flex-col gap-2 p-6">
        <Checkbox label="東証TOKYOPROMarket" value="test" />
        <Checkbox label="東証TOKYOPROMarket" value="test 1" defaultChecked />
        <Checkbox checked="indeterminate" />
      </div>
    )
  },
}

export const DisabledCheckbox: StoryObj<typeof Checkbox> = {
  render() {
    return (
      <div className="flex h-24 flex-col gap-2 p-6">
        <Checkbox label="東証TOKYOPROMarket" value="test" disabled />
        <Checkbox
          label="東証TOKYOPROMarket"
          value="test 1"
          disabled
          defaultChecked
        />
        <Checkbox disabled checked="indeterminate" />
      </div>
    )
  },
}

export const SubLabelCheckbox: StoryObj<typeof Checkbox> = {
  render() {
    return (
      <div className="flex h-24 flex-col gap-2 p-6">
        <Checkbox
          label="東証TOKYOPROMarket"
          value="test"
          subLabel="Save my login details for next time."
        />
        <Checkbox
          label="東証TOKYOPROMarket"
          value="test 1"
          disabled
          defaultChecked
          subLabel="Save my login details for next time."
        />
      </div>
    )
  },
}
