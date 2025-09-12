import { Skeleton } from '@/components/ui/skeleton';
import {
  Tabs as TabRoot,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { clsx } from 'clsx';

export type TabsSize = 'xs' | 'sm' | 'md' | 'lg';
export type TabsVariant = 'filled' | 'underline';

interface ITabsProps {
  tabsList: {
    value: string;
    label: React.ReactNode;
    content: React.ReactNode;
    numberOfValue?: number;
    disabled?: boolean;
    icon?: React.ReactNode;
    displayNumberOfValue?: boolean;
    isLoadingNumberOfValue?: boolean;
  }[];
  defaultValue?: string;
  iconPosition?: 'left' | 'right' | 'top' | 'bottom';
  numberOfValuePosition?: 'left' | 'bottom' | 'right';
  className?: string;
  size?: TabsSize;
  variant?: TabsVariant;
  onChange?: (value: string) => void;
  tabBarExtraContent?: React.ReactNode;
  classNameContent?: string;
  classNameItem?: string;
  value?: string;
}

const Tabs = ({
  tabsList,
  iconPosition = 'left',
  defaultValue,
  numberOfValuePosition = 'left',
  className,
  size = 'md',
  variant = 'underline',
  onChange,
  tabBarExtraContent,
  classNameContent,
  classNameItem,
  value,
}: ITabsProps) => {
  return (
    <TabRoot value={value} defaultValue={defaultValue} className={className}>
      <div className="flex items-center justify-between">
        <TabsList
          className={clsx(
            'flex items-end',
            variant === 'filled' && 'border-b bg-body-background p-3',
            className
          )}
        >
          {tabsList.map((item) => (
            <TabsTrigger
              key={item.value}
              disabled={item.disabled}
              value={item.value}
              className={clsx(
                'group !mb-0 flex grow basis-auto items-center justify-center border-b-2 text-text-primary [&[data-state=active]>div:nth-child(2)]:text-white',
                size === 'xs' && 'py-[5px] text-sm font-normal leading-5',
                size === 'sm' && 'text-sm font-normal leading-5',
                size === 'md' && 'text-base font-normal leading-6',
                size === 'lg' && 'text-xl font-medium leading-8',
                variant === 'filled' &&
                  'rounded-[6px] border-transparent hover:bg-primary-outlined-hover data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:hover:bg-primary [&[data-state=active]>div:nth-child(2)]:bg-primary-light',
                variant === 'underline' &&
                  'hover:border-primary-outlined-resting hover:text-primary-outlined-resting data-[state=active]:border-primary data-[state=active]:text-primary',
                item.disabled && '!text-text-disabled',
                numberOfValuePosition === 'left' && 'flex-row-reverse gap-1',
                numberOfValuePosition === 'right' && 'flex-row gap-1',
                numberOfValuePosition === 'bottom' && 'flex-col',
                classNameItem
              )}
              onClick={(e) => {
                onChange?.(item.value);
                e.stopPropagation();
              }}
            >
              <div
                className={clsx(
                  item.icon && 'flex items-center justify-center',
                  iconPosition === 'top' && 'flex-col',
                  iconPosition === 'bottom' && 'flex-col-reverse',
                  iconPosition === 'left' && 'flex-row-reverse gap-[6px]',
                  iconPosition === 'right' && 'flex-row gap-[6px]'
                )}
              >
                {item.label}
                {!!item.icon && item.icon}
              </div>
              {item.displayNumberOfValue &&
                (item.isLoadingNumberOfValue ? (
                  <Skeleton className="z-50 h-[20px] w-fit min-w-8 animate-pulse rounded-[5px] bg-action-hover px-[2px] text-xs font-medium leading-5" />
                ) : (
                  <div
                    className={clsx(
                      'z-30 w-fit min-w-8 rounded-[5px] bg-action-hover px-[2px] text-xs font-medium leading-5 !text-text-secondary group-hover:!text-text-secondary'
                    )}
                  >
                    {(item.numberOfValue ?? 0) > 99
                      ? '99+'
                      : (item.numberOfValue ?? '')}
                  </div>
                ))}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabBarExtraContent && <div className="pr-6">{tabBarExtraContent}</div>}
      </div>
      <div
        className={clsx(
          '-mt-[2px] border-b-2',
          size === 'xs' && 'mt-0 border-none'
        )}
      />
      {tabsList.map((content) => (
        <TabsContent
          className={classNameContent}
          key={`content-${content.value}`}
          value={content.value}
        >
          {content.content}
        </TabsContent>
      ))}
    </TabRoot>
  );
};

export default Tabs;
