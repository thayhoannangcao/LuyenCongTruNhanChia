import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import FormDateInput from './FormDateInput'
import Button from '../Button'

export default {
  title: 'Common/FormDateInput',
  component: FormDateInput,
} as Meta<typeof FormDateInput>

interface IFormData {
  username?: string
}

export const FormDateInputCommon: StoryObj<typeof FormDateInput> = {
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
          <FormDateInput
            control={control}
            name="birthday"
            label="Birthday"
            errors={errors}
            showTime
            datePickerProps={{ mode: 'single' }}
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

export const FormDateRangeInput: StoryObj<typeof FormDateInput> = {
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
          <FormDateInput
            control={control}
            name="duration"
            label="Duration"
            placeholder={'YYYY-MM-DD ~ YYYY-MM-DD'}
            errors={errors}
            datePickerProps={{ mode: 'range' }}
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
