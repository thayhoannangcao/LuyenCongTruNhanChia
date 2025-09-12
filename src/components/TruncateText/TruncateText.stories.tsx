import type { Meta, StoryObj } from '@storybook/react';
import TruncateText from './TruncateText';

export default {
  title: 'Common/TruncateText',
  component: TruncateText,
} as Meta<typeof TruncateText>;

export const TruncateTextDefault: StoryObj<typeof TruncateText> = {
  render() {
    const text =
      'This is a very long text that to be truncated to demonstrate the truncation feature in the component. ';

    return (
      <div className="w-[400px]">
        <TruncateText
          text={text}
          className="items-center truncate text-sm text-text-primary"
          TooltipProps={{
            children: (
              <div className="bg-secondary-light px-2 py-1 text-sm text-white">
                {text}
              </div>
            ),
          }}
        />
      </div>
    );
  },
};

export const TruncateLineClamp: StoryObj<typeof TruncateText> = {
  render() {
    const text =
      'This is a very long text that to be truncated to demonstrate the truncation feature in the component. This is a very long text that to be truncated to demonstrate the truncation feature in the component. ';
    return (
      <div className="max-w-[400px]">
        <TruncateText
          text={text}
          className="line-clamp-[3] items-center text-sm text-text-primary"
          TooltipProps={{
            children: (
              <div className="bg-secondary-light px-2 py-1 text-sm text-white">
                {text}
              </div>
            ),
          }}
        />
      </div>
    );
  },
};
