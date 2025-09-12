import React, { useRef, useState, useEffect } from 'react';
import { clsx } from 'clsx';
import TooltipCommon from '../Tooltip';
import { useWindowSize } from 'react-use';

interface TruncateTextProps {
  text: string | React.ReactNode;
  className?: string;
  classNameContentTooltip?: string;
  TooltipProps?: React.ComponentPropsWithoutRef<typeof TooltipCommon>;
  style?: React.CSSProperties;
}

function TruncateText({
  text,
  className,
  classNameContentTooltip,
  TooltipProps,
  style,
}: TruncateTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const checkOverflow = () => {
      const container = containerRef.current;
      const content = container?.children[0] as HTMLElement | undefined;

      if (!container || !content) return;

      const isOverflow =
        content.scrollWidth > container.clientWidth ||
        content.scrollHeight > container.clientHeight + 5;

      setIsOverflowed(isOverflow);
    };

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(containerRef.current);

    checkOverflow();

    return () => observer.disconnect();
  }, [text]);

  return (
    <div className="w-full" ref={containerRef}>
      <TooltipCommon
        title={text}
        {...TooltipProps}
        className={clsx(
          { truncate: !className?.includes('line-clamp') },
          className,
          { '!cursor-[inherit]': !isOverflowed }
        )}
        classNameContent={clsx(
          'break-all max-h-[300px] overflow-y-auto',
          classNameContentTooltip
        )}
        isOverflowed={isOverflowed}
        style={style}
      >
        {TooltipProps?.children ?? text}
      </TooltipCommon>
    </div>
  );
}

export default TruncateText;
