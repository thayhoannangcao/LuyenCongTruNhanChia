import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import FormCheckbox from './FormCheckbox';

export default {
  title: 'Common/FormCheckbox',
  component: FormCheckbox,
} as Meta<typeof FormCheckbox>;
export const FormSwitchInputCommon: StoryObj<typeof FormCheckbox> = {
  render() {
    const {
      control,
      formState: { errors, isValid },
    } = useForm({
      mode: 'onChange',
    });

    return (
      <div className="bg-neutral-white h-[160px] p-6">
        <form>
          <FormCheckbox
            control={control}
            name="darkMode"
            label="Dark mode"
            value="darkMode"
            errors={errors}
            defaultChecked={true}
          />
          <Button
            type="submit"
            title="Submit"
            className="mt-6"
            disable={!isValid}
          />
        </form>
      </div>
    );
  },
};
