import type { ReactNode } from 'react';
import React, { useState } from 'react';
import { clsx } from 'clsx';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
} from '@/components/ui/tooltip';

interface TooltipCommonProps {
  title?: string | ReactNode;
  children?: ReactNode;
  className?: string;
  classNameContent?: string;
  isOverflowed?: boolean;
  disabled?: boolean;
  tooltipContentProps?: React.ComponentPropsWithoutRef<typeof TooltipContent>;
  style?: React.CSSProperties;
}

function TooltipCommon({
  title,
  children,
  className,
  classNameContent,
  isOverflowed = true,
  tooltipContentProps,
  disabled = false,
  style,
}: TooltipCommonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleTooltip = () => {
    setIsOpen(!isOpen);
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip
        open={disabled ? false : !isOverflowed ? false : isOpen}
        onOpenChange={setIsOpen}
      >
        <TooltipTrigger asChild>
          <div
            className={clsx(
              'cursor-pointer overflow-hidden whitespace-pre',
              className
            )}
            onClick={handleToggleTooltip}
            style={style}
          >
            {title}
          </div>
        </TooltipTrigger>
        {children && (
          <TooltipContent
            className={clsx(
              'max-w-[360px] whitespace-pre rounded-[4px] bg-secondary-light px-2 py-1 text-white [&_p]:text-white',
              classNameContent
            )}
            onClick={(e) => {
              e.stopPropagation();
            }}
            {...tooltipContentProps}
          >
            {children}
            <TooltipArrow
              width={'12px'}
              height={'7px'}
              className="fill-secondary-light"
            />
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

export default TooltipCommon;
