'use client';
import {
  Timeline as TimelineBase,
  TimelineContent,
  TimelineIcon,
  TimelineItem,
  TimelineSubContent,
} from '@/components/ui/timeline';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { FaRegCircleCheck } from 'react-icons/fa6';
import StepperSkeleton from './StepperSkeleton';
import ArrowDownIcon from '@/public/icons/ArrowDownIcon';

interface StepperElement {
  content: ReactNode;
  icon?: ReactNode;
  active?: boolean;
  checked?: boolean;
  key?: string;
  disabled?: boolean;
  onClick?: () => void;
}

interface StepperProps {
  className?: string;
  data: StepperElement[];
  isLoading?: boolean;
}

const Stepper = ({ className, data, isLoading }: StepperProps) => {
  if (isLoading) {
    return <StepperSkeleton />;
  }
  return (
    <TimelineBase className={clsx('flex justify-center')}>
      <div
        className={clsx(
          'flex h-full flex-col items-center justify-center py-10',
          className
        )}
      >
        {data.map((section, sectionIndex) => (
          <TimelineItem key={section.key} className="flex w-fit items-center">
            <TimelineContent
              className={clsx('h-full w-full rounded-full bg-white p-3 px-4', {
                'opacity-40': !section.active || section.disabled,
                'cursor-pointer': section.active,
              })}
              onClick={() =>
                section.active && section.onClick && section.onClick()
              }
            >
              <TimelineIcon disabled={section.disabled} active={section.active}>
                {section.icon}
              </TimelineIcon>
              <TimelineSubContent disabled={section.disabled}>
                {section.content}
              </TimelineSubContent>

              {section.checked && (
                <TimelineIcon>
                  <FaRegCircleCheck size="24px" className="text-success" />
                </TimelineIcon>
              )}
            </TimelineContent>
            {sectionIndex < data.length - 1 && sectionIndex < data.length && (
              <ArrowDownIcon opacity40={!section.checked} className="my-1" />
            )}
          </TimelineItem>
        ))}
      </div>
    </TimelineBase>
  );
};
export default Stepper;
