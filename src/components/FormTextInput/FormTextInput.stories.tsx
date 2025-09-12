import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import FormTextInput from './FormTextInput';

export default {
  title: 'Common/FormTextInput',
  component: FormTextInput,
} as Meta<typeof FormTextInput>;

export const FormTextInputLarge: StoryObj<typeof FormTextInput> = {
  render() {
    const {
      control,
      setValue,
      formState: { errors, isValid },
    } = useForm({
      mode: 'onChange',
    });

    return (
      <div className="bg-neutral-white h-[160px] p-6">
        <form>
          <FormTextInput
            control={control}
            name="username"
            label="Username"
            errors={errors}
            rules={{
              required: {
                value: true,
                message: 'Username is required!',
              },
            }}
            onClear={() =>
              setValue('username', '', {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
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
