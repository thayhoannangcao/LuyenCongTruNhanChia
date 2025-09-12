import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import FormTextInputArea from './FormTextInputArea';

export default {
  title: 'Common/FormTextInputArea',
  component: FormTextInputArea,
} as Meta<typeof FormTextInputArea>;

interface IFormData {
  username?: string;
}

export const FormTextInputAreaLarge: StoryObj<typeof FormTextInputArea> = {
  render() {
    const {
      control,
      handleSubmit,
      formState: { errors, isValid },
      // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useForm({
      mode: 'onChange',
    });
    const onSubmit = (data: IFormData) => {
      console.log('value', data);
    };

    return (
      <div className="bg-neutral-white h-[160px] p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormTextInputArea
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
