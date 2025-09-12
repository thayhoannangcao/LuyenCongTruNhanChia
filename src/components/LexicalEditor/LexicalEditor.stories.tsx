import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import LexicalEditor from './LexicalEditor';
export default {
  title: 'Common/LexicalEditor',
  component: LexicalEditor,
} as Meta<typeof LexicalEditor>;
export const LexicalCommon: StoryObj<typeof LexicalEditor> = {
  render() {
    const {
      control,
      // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useForm({
      mode: 'onChange',
    });
    return (
      <form>
        <LexicalEditor
          control={control}
          name="content"
          placeholder="input some text"
        />
      </form>
    );
  },
};
