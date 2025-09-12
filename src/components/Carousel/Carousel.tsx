'use client';

import {
  Carousel as CarouselCommon,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface CollapsibleProps {
  className?: string;
  items?: {
    content: React.ReactNode;
  }[];
  showNavigation?: boolean;
  classNameContent?: string;
  onSlideChange?: (index: number) => void;
}

const Carousel = ({
  className,
  items,
  showNavigation = true,
  classNameContent,
  onSlideChange,
}: CollapsibleProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const currentIndex = api.selectedScrollSnap();
      setActiveIndex(currentIndex);
      onSlideChange?.(currentIndex);
    };

    api.on('select', onSelect);
    onSelect();

    return () => {
      api.off('select', onSelect);
    };
  }, [api, onSlideChange]);

  return (
    <div
      className={clsx('relative flex w-full flex-col items-center', className)}
    >
      <CarouselCommon setApi={setApi}>
        <CarouselContent className={classNameContent}>
          {items?.map((item, index) => (
            <CarouselItem key={index}>
              <div>{item.content}</div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {showNavigation && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </CarouselCommon>

      <div className="mt-3 flex gap-2">
        {items?.map((_, index) => (
          <span
            key={index}
            className={clsx(
              'h-[10px] w-[10px] cursor-pointer rounded-full transition-colors',
              activeIndex === index
                ? 'bg-primary hover:bg-primary-light'
                : 'bg-primary-outlined-hover hover:bg-primary-outlined-hover/80'
            )}
            onClick={(e) => {
              e.preventDefault();
              api?.scrollTo(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
