'use client';
import {
  Timeline as TimelineBase,
  TimelineConnector,
  TimelineContent,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineSubContent,
} from '@/components/ui/timeline';
import { Fragment } from 'react';
import type { ReactNode } from 'react';
import Tag from '../Tag';
import TimelineSkeleton from './TimelineSkeleton';

interface TimelineElement {
  content: ReactNode;
  icon?: ReactNode;
  active?: boolean;
  key?: string;
  disabled?: boolean;
}

interface TimelineData {
  header?: string;
  items: TimelineElement[];
  classNameHeader?: string;
  key?: string;
}

interface TimelineProps {
  className?: string;
  data: TimelineData[];
  isLoading?: boolean;
}
const getActiveConnector = (
  index: number,
  sectionIndex: number,
  data: TimelineData[]
) => {
  if (index < data[sectionIndex].items.length - 1) {
    return data[sectionIndex].items[index + 1].active;
  }
  if (sectionIndex < data.length - 1) {
    return data[sectionIndex + 1].items[0]?.active;
  }
  return false;
};
const Timeline = ({ className, data, isLoading }: TimelineProps) => {
  if (isLoading) {
    return <TimelineSkeleton />;
  }
  return (
    <TimelineBase className={className}>
      {data.map(
        (section, sectionIndex) =>
          section.items.length > 0 && (
            <Fragment key={section.key}>
              {section.header && (
                <TimelineHeader>
                  <Tag
                    className={section.classNameHeader}
                    label={section.header}
                  />
                </TimelineHeader>
              )}

              {section.items.map((item, index) => {
                const activeConnector = getActiveConnector(
                  index,
                  sectionIndex,
                  data
                );

                return (
                  <TimelineItem
                    key={item.key}
                    className="flex min-h-[120px] w-full flex-col px-6 py-3 pt-0"
                  >
                    {sectionIndex < data.length - 1 &&
                      index < section.items.length && (
                        <TimelineConnector
                          classNameConnector={
                            index === section.items.length - 1 ? 'h-[105%]' : ''
                          }
                          active={activeConnector}
                        />
                      )}
                    {sectionIndex === data.length - 1 &&
                      index < section.items.length - 1 && (
                        <TimelineConnector
                          active={activeConnector}
                          classNameConnector="-translate-x-1/2"
                        />
                      )}
                    <TimelineContent>
                      <TimelineIcon
                        disabled={item.disabled}
                        active={item.active}
                        classNameIcon="ml-1 mt-[2px] flex size-6 flex-col"
                      >
                        {item.icon}
                      </TimelineIcon>
                      <TimelineSubContent disabled={item.disabled}>
                        {item.content}
                      </TimelineSubContent>
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
            </Fragment>
          )
      )}
    </TimelineBase>
  );
};
export default Timeline;
