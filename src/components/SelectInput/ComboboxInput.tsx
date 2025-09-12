'use client';
import EmptyData from '@/components/common/EmptyData';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  LIMIT_SELECT_OPTIONS,
  MAX_INPUT_LENGTH,
} from '@/src/constants/number.constants';
import type { InputSize } from '@/types/app';
import clsx from 'clsx';
import { Check, ChevronDown, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { useState } from 'react';
import XIcon from '../../../../public/icons/x.svg';
import FormLabelProvider from '../common/FormLabelProvider';
import OptionSkeleton from '../common/Skeleton/OptionSkeleton';
import Tag from '../Tag';
import TruncateText from '../TruncateText';
import type { TSelectOption } from '../types/form';

export interface ISelectInputProps {
  inputSize?: InputSize;
  className?: string;
  classNameWrapper?: string;
  classNameOption?: string;
  label?: string | React.ReactNode;
  required?: boolean;
  error?: string;
  options: TSelectOption[];
  onSelected?: (values: string[] | string | undefined) => void;
  placeholder?: string | React.ReactNode;
  disabled?: boolean;
  values?: string[];
  defaultValues?: string[];
  searchValue?: string;
  onSearchValueChange?: (value: string) => void;
  mode?: 'single' | 'multiple';
  showClear?: boolean;
  showSearch?: boolean;
  icon?: React.ReactNode;
  isLoading?: boolean;
  shouldFilter?: boolean;
  empty?: React.ReactNode;
  onSearchKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  addonItem?: React.ReactNode;
  valueExternal?: string[];
  onRemoveValueExternal?: (value: string) => void;
  customTag?: React.ReactNode;
  helperText?: string | React.ReactNode;
  helperTextOptions?: React.ReactNode;
  footer?: React.ReactNode;
  classNameLabel?: string;
  placeholderSearch?: string;
  hidePlaceholderOnFocus?: boolean;
  externalSearch?: boolean;
  optionsDefault?: TSelectOption[];
  handleClearValue?: () => void;
}
export function ComboboxInput({
  inputSize = 'md',
  className,
  label,
  error,
  placeholder,
  options,
  required,
  disabled,
  values,
  searchValue,
  onSearchValueChange,
  onSelected,
  defaultValues,
  mode = 'single',
  showClear = true,
  showSearch = true,
  icon = <ChevronDown />,
  shouldFilter = false,
  isLoading,
  empty = <EmptyData />,
  addonItem,
  onSearchKeyDown,
  valueExternal,
  onRemoveValueExternal,
  classNameWrapper,
  customTag,
  helperText,
  footer,
  classNameOption,
  classNameLabel,
  helperTextOptions,
  placeholderSearch,
  hidePlaceholderOnFocus = false,
  externalSearch = false,
  optionsDefault,
  handleClearValue,
}: Readonly<ISelectInputProps>) {
  const [open, setOpen] = React.useState(false);
  const [searchValueError, setSearchValueError] = useState<string | null>(null);
  const transError = useTranslations('zod.errors');
  const labelMap = new Map(options.map((item) => [item.value, item.label]));
  const labelCacheRef = React.useRef(
    new Map<string, { label: string; displayLabel?: string }>()
  );

  const allOptions = React.useMemo(() => {
    return [...(optionsDefault ?? []), ...options];
  }, [options, optionsDefault]);

  React.useMemo(() => {
    allOptions.forEach((item) => {
      const existing = labelCacheRef.current.get(item.value);
      if (!existing || existing.label !== item.label) {
        labelCacheRef.current.set(item.value, {
          label: item.label,
          displayLabel: item.displayLabel,
        });
      }
    });
  }, [allOptions]);

  const currentValues = values || defaultValues;
  const valuesMap = currentValues?.map((value) => {
    const cached = labelCacheRef.current.get(value);
    return {
      value,
      label: cached?.label || value,
      labelDisplay: cached?.displayLabel || undefined,
    };
  });

  const [internalSearchValue, setInternalSearchValue] = React.useState('');
  const [visibleCount, setVisibleCount] = React.useState(LIMIT_SELECT_OPTIONS);

  React.useEffect(() => {
    setVisibleCount(LIMIT_SELECT_OPTIONS);
  }, [internalSearchValue, searchValue]);

  React.useEffect(() => {
    setVisibleCount(LIMIT_SELECT_OPTIONS);
  }, [options]);

  const handleUpdateValues = (
    currentValues: string[] | undefined,
    itemValue: string
  ): string[] => {
    if (!currentValues) return [];
    return currentValues.filter((v) => v !== itemValue);
  };

  const handleRemove = (
    e: React.MouseEvent,
    currentValues: string[] | undefined,
    itemValue: string,
    onSelected?: (updatedValues: string[]) => void
  ) => {
    e?.preventDefault();
    const updatedValues = handleUpdateValues(currentValues, itemValue);
    onSelected?.(updatedValues);
  };

  const renderMultipleTags = () => {
    if (valuesMap && mode === 'multiple') {
      return (
        <div
          className={clsx(
            'flex flex-1 flex-wrap justify-start gap-1 text-text-primary',
            showClear ? 'w-[calc(100%-3rem)]' : 'w-[calc(100%-1rem)]'
          )}
        >
          {valuesMap?.map((item) => (
            <Tag
              key={item.value}
              className="rounded-lg bg-white px-1"
              label={item.labelDisplay || item.label}
              variant="main"
              size="sm"
              onRemove={(e) =>
                handleRemove(e, currentValues, item.value, onSelected)
              }
              icon={<XIcon />}
            />
          ))}
        </div>
      );
    }
    return (
      <div className="max-w-full truncate whitespace-pre">
        {valuesMap?.[0]?.labelDisplay || valuesMap?.[0]?.label || null}
      </div>
    );
  };

  const renderTagValue = () => {
    if (!valueExternal?.length && !currentValues?.length) {
      return open && hidePlaceholderOnFocus ? null : (
        <div className="truncate text-text-disabled">{placeholder}</div>
      );
    }
    return (
      customTag ?? (
        <div className="w-full justify-start space-y-1">
          {valueExternal?.map((item) => (
            <Tag
              key={item}
              className="rounded-lg bg-white px-1"
              label={item}
              variant="main"
              size="sm"
              onRemove={(e) => {
                e?.preventDefault();
                onRemoveValueExternal?.(item);
              }}
              icon={<XIcon />}
            />
          ))}
          <div className="flex">{renderMultipleTags()}</div>
        </div>
      )
    );
  };

  const filteredOptions = React.useMemo(() => {
    if (externalSearch) return options;

    const search = (searchValue ?? internalSearchValue)?.toLowerCase();
    if (!search) return options;
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(search) ||
        option.value.toLowerCase().includes(search) ||
        (option.displayValue &&
          typeof option.displayValue === 'string' &&
          option.displayValue.toLowerCase().includes(search))
    );
  }, [options, internalSearchValue, searchValue, shouldFilter]);

  const displayOptions = React.useMemo(() => {
    return filteredOptions.slice(0, visibleCount);
  }, [filteredOptions, visibleCount]);

  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        setVisibleCount((prev) => prev + LIMIT_SELECT_OPTIONS);
      }
    }
  };

  const handleSearchChange = (value: string) => {
    if (value.length > MAX_INPUT_LENGTH) {
      setSearchValueError(
        transError('too_big.string.inclusive', { maximum: MAX_INPUT_LENGTH })
      );
    } else {
      setSearchValueError(null);
      setInternalSearchValue(value);
      onSearchValueChange?.(value);
    }
  };

  return (
    <FormLabelProvider
      label={label}
      error={error}
      required={required}
      classNameWrapper={classNameWrapper}
      className={classNameLabel}
      helperText={helperText}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={clsx(
              'custom-border box-border flex w-full justify-between rounded-lg bg-other [&[data-state=open]]:border-action-active [&_svg]:size-4',
              inputSize === 'lg' && 'h-[52px]',
              inputSize === 'sm' &&
                `${mode === 'multiple' ? 'min-h-8' : 'h-8'} py-1`,
              mode === 'multiple' && 'h-auto',
              !!error && 'border-error',
              className
            )}
          >
            <div className="flex w-full items-center justify-between gap-1.5">
              <div
                className={clsx(
                  'flex-1 text-start text-text-primary',
                  showClear ? 'max-w-[80%]' : 'max-w-[90%]'
                )}
              >
                {renderTagValue()}
              </div>
              <div className="flex items-center justify-end gap-1.5">
                {showClear &&
                  (!!values?.length ||
                    !!defaultValues?.length ||
                    !!valueExternal?.length) && (
                    <div
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        if (handleClearValue) {
                          handleClearValue();
                        } else {
                          onSelected?.(mode === 'multiple' ? [] : undefined);
                        }
                      }}
                      role="button"
                    >
                      <X className="text-text-secondary" />
                    </div>
                  )}
                <div
                  className={clsx(
                    'text-center align-middle text-text-secondary',
                    open && 'rotate-180'
                  )}
                >
                  {icon}
                </div>
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={4}
          className={clsx(
            'w-[var(--radix-popover-trigger-width)] p-0',
            className
          )}
        >
          <Command shouldFilter={shouldFilter}>
            {showSearch && (
              <>
                <CommandInput
                  value={searchValue ?? internalSearchValue}
                  onValueChange={handleSearchChange}
                  className="h-9"
                  onKeyDown={(e) => onSearchKeyDown?.(e || undefined)}
                  placeholder={placeholderSearch}
                />
                {searchValueError && (
                  <div className="mx-2 my-2 text-xs font-normal text-error">
                    {searchValueError}
                  </div>
                )}
              </>
            )}
            <CommandList
              onScroll={handleScroll}
              ref={containerRef}
              onWheel={(e) => e.stopPropagation()}
              className="border-red-500 max-h-[300px] overflow-y-auto overflow-x-hidden border"
            >
              {addonItem && (
                <div
                  className="cursor-pointer px-1 py-1"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  {addonItem}
                </div>
              )}
              {isLoading ? (
                <OptionSkeleton length={4} />
              ) : (
                <>
                  <CommandEmpty className="px-2 py-1">
                    {!addonItem && empty}
                  </CommandEmpty>
                  <CommandGroup className={classNameOption}>
                    {displayOptions.length > 0 &&
                      displayOptions.map((option) => (
                        <CommandItem
                          disabled={option.disabled}
                          key={option.value}
                          value={option.value}
                          onSelect={() => {
                            const currentValue = option.value;
                            if (mode === 'single') {
                              onSelected?.(currentValue);
                              setOpen(false);
                              return;
                            }
                            if (values?.includes(currentValue)) {
                              onSelected?.(
                                values.filter((value) => value !== currentValue)
                              );
                            } else {
                              onSelected?.(
                                values
                                  ? [...values, currentValue]
                                  : [currentValue]
                              );
                            }
                            setOpen(false);
                          }}
                          className="flex items-center justify-between text-text-primary"
                        >
                          <div className="min-w-0 flex-1 truncate whitespace-pre">
                            <TruncateText
                              text={option.displayValue || option.label}
                              TooltipProps={{
                                children: (
                                  <div className="break-words bg-secondary-light px-2 py-1 text-sm text-white">
                                    {option.displayValue || option.label}
                                  </div>
                                ),
                              }}
                            />
                          </div>
                          {values?.includes(option.value) && (
                            <Check
                              className={cn(
                                'ml-2 h-5 w-5 shrink-0 text-text-primary',
                                values?.includes(option.value)
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          )}
                        </CommandItem>
                      ))}
                    {!!helperTextOptions && (
                      <>
                        <div className="my-[4px] h-[1px] w-full bg-[#1218311F]"></div>
                        {helperTextOptions}
                      </>
                    )}
                  </CommandGroup>
                </>
              )}
            </CommandList>
            {footer && <div className="py-1.5">{footer}</div>}
          </Command>
        </PopoverContent>
      </Popover>
    </FormLabelProvider>
  );
}
