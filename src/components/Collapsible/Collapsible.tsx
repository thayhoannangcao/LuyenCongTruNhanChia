import type {
  ArrowIconAccordionType,
  RoleAccordionType,
} from '@/components/ui/accordion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface CollapsibleProps {
  className?: string;
  classNameTrigger?: string;
  classNameTitle?: string;
  type?: 'single' | 'multiple';
  role?: RoleAccordionType;
  items: {
    content?: ReactNode | string;
    trigger?: ReactNode | string;
    extraContentTrigger?: ReactNode;
    numberOfValue?: number;
    tagHeaderHandleClick?: () => void;
    subContent?: ReactNode;
    value?: string;
  }[];
  value?: string[] | string;
  defaultValue?: string[] | string;
  onValueChange?: (value: string[] | string) => void;
  arrowIconType?: ArrowIconAccordionType;
}

const Collapsible = ({
  className,
  type = 'single',
  role = 'item',
  value,
  defaultValue,
  onValueChange,
  classNameTrigger,
  classNameTitle,
  items,
  arrowIconType = 'caret',
}: CollapsibleProps) => {
  return (
    <Accordion
      className={clsx(
        'flex w-full flex-col gap-3 truncate',
        role === 'menu-bar' && '!bg-transparent p-0 !shadow-none',
        className
      )}
      {...(type === 'single'
        ? {
            type: 'single',
            value: value as string,
            defaultValue: defaultValue as string,
            collapsible: !value,
          }
        : {
            type: 'multiple',
            value: value as string[],
            defaultValue: defaultValue as string[],
            collapsible: !value,
          })}
      onValueChange={onValueChange}
    >
      {items.map((item, index) => (
        <AccordionItem
          className={clsx(
            'overflow-hidden',
            (role === 'section' || role === 'label') && 'border-none',
            classNameTrigger
          )}
          key={index}
          value={item.value ?? `item-${index + 1}`}
        >
          <AccordionTrigger
            tagHeaderHandleClick={item.tagHeaderHandleClick}
            numberOfValue={item.numberOfValue}
            subContent={item.subContent}
            extraContentTrigger={item.extraContentTrigger}
            role={role}
            className={clsx(classNameTrigger, classNameTitle)}
            arrowIconType={arrowIconType}
          >
            {role === 'item' && !!item.numberOfValue && (
              <div className="h-[10px] w-[10px] rounded-full bg-primary pr-1" />
            )}
            {item.trigger}
          </AccordionTrigger>

          <AccordionContent className={clsx(role == 'radio-content' && 'pt-3')}>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Collapsible;
