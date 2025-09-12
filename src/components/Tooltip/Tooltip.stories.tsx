import type { Meta, StoryObj } from '@storybook/react';
import TooltipCommon from './Tooltip';
import { TbHelpCircle } from 'react-icons/tb';

export default {
  title: 'Common/Tooltip',
  component: TooltipCommon,
} as Meta<typeof TooltipCommon>;

export const TooltipTop: StoryObj<typeof TooltipCommon> = {
  render() {
    return (
      <TooltipCommon
        title={
          <>
            Hover
            <TbHelpCircle className="ml-1 h-[22px] w-[22px] text-text-disabled" />
          </>
        }
        tooltipContentProps={{ side: 'top' }}
        className="inline-flex items-center text-base text-secondary"
      >
        <div className="text-[11px]">This is a tooltip content.</div>
      </TooltipCommon>
    );
  },
};

export const TooltipBot: StoryObj<typeof TooltipCommon> = {
  render() {
    return (
      <TooltipCommon
        title={
          <>
            Hover
            <TbHelpCircle className="ml-1 h-[22px] w-[22px] text-text-disabled" />
          </>
        }
        tooltipContentProps={{ side: 'bottom' }}
        className="inline-flex items-center text-base text-secondary"
      >
        <div className="text-[11px]">This is a tooltip content.</div>
      </TooltipCommon>
    );
  },
};

export const TooltipRight: StoryObj<typeof TooltipCommon> = {
  render() {
    return (
      <TooltipCommon
        title={
          <>
            Hover
            <TbHelpCircle className="ml-1 h-[22px] w-[22px] text-text-disabled" />
          </>
        }
        tooltipContentProps={{ side: 'right' }}
        className="inline-flex items-center text-base text-secondary"
      >
        <div className="text-[11px]">This is a tooltip content.</div>
      </TooltipCommon>
    );
  },
};

export const TooltipLeft: StoryObj<typeof TooltipCommon> = {
  render() {
    return (
      <TooltipCommon
        title={
          <>
            Hover
            <TbHelpCircle className="ml-1 h-[22px] w-[22px] text-text-disabled" />
          </>
        }
        tooltipContentProps={{ side: 'left' }}
        className="inline-flex items-center text-base text-secondary"
      >
        <div className="text-[11px]">This is a tooltip content.</div>
      </TooltipCommon>
    );
  },
};
