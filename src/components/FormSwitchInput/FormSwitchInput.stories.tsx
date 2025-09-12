import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import Button from '../Button'
import FormSwitchInput from './FormSwitchInput'

export default {
  title: 'Common/FormSwitchInput',
  component: FormSwitchInput,
} as Meta<typeof FormSwitchInput>

interface IFormData {
  username?: string
}

export const FormSwitchInputCommon: StoryObj<typeof FormSwitchInput> = {
  render() {
    const {
      control,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm({
      mode: 'onChange',
    })
    const onSubmit = (data: IFormData) => {
      console.log('value', data)
    }

    return (
      <div className="h-[160px] bg-neutral-white p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormSwitchInput
            control={control}
            name="darkMode"
            label="Dark mode"
            errors={errors}
          />
          <Button
            type="submit"
            title="Submit"
            className="mt-6"
            disable={!isValid}
          />
        </form>
      </div>
    )
  },
}
