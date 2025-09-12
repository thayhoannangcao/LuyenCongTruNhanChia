import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import Button from '../Button'
import FormRadio from './FormRadio'

export default {
  title: 'Common/FormRadio',
  component: FormRadio,
} as Meta<typeof FormRadio>

interface IFormData {
  username?: string
}

const optionsFormat = [
  { value: 'test', label: 'test' },
  { value: 'test 1', label: 'test 1' },
  { value: 'test 2', label: 'test 2' },
]

export const FormSwitchInputCommon: StoryObj<typeof FormRadio> = {
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
          <FormRadio
            control={control}
            name="darkMode"
            label="Dark mode"
            errors={errors}
            options={optionsFormat}
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
