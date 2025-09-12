import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import FormSelectInput from './FormSelectInput';
import StoryBookNextIntlProvider from '../common/StoryBookNextIntlProvider';
const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];
export default {
  title: 'Form/FormSelectInput',
  component: FormSelectInput,
} as Meta<typeof FormSelectInput>;

interface IFormData {
  framework?: string;
}

export const FormSelectInputSingle: StoryObj<typeof FormSelectInput> = {
  render() {
    const {
      control,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm({
      mode: 'onChange',
    });
    const onSubmit = (data: IFormData) => {
      console.log('value', data);
    };

    return (
      <StoryBookNextIntlProvider>
        <div className="bg-neutral-white h-[160px] p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormSelectInput
              control={control}
              name="framework"
              label="Framework"
              errors={errors}
              rules={{
                required: {
                  value: true,
                  message: 'This field is required!',
                },
              }}
              options={frameworks}
              placeholder="Select..."
            />
            <Button
              type="submit"
              title="Submit"
              className="mt-6"
              disable={!isValid}
            />
          </form>
        </div>
      </StoryBookNextIntlProvider>
    );
  },
};

export const FormSelectInputMultiple: StoryObj<typeof FormSelectInput> = {
  render() {
    const {
      control,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm({
      mode: 'onChange',
    });
    const onSubmit = (data: IFormData) => {
      console.log('value', data);
    };

    return (
      <StoryBookNextIntlProvider>
        <div className="bg-neutral-white h-[160px] p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormSelectInput
              control={control}
              name="framework"
              label="Framework"
              errors={errors}
              rules={{
                required: {
                  value: true,
                  message: 'This field is required!',
                },
              }}
              options={frameworks}
              mode="multiple"
              placeholder="Select..."
            />
            <Button
              type="submit"
              title="Submit"
              className="mt-6"
              disable={!isValid}
            />
          </form>
        </div>
      </StoryBookNextIntlProvider>
    );
  },
};
