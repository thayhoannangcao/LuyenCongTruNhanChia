import { NO_LEADING_WHITE_SPACE_REGEX } from '@/src/constants/regex.constants';
import { clsx } from 'clsx';
import { X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import FormLabel from '../common/FormLabel';
import Tag from '../Tag';
import { useTranslations } from 'next-intl';
export type TagInputSize = 'sm' | 'md' | 'lg';
export type TagVariant = 'primary' | 'light';

export interface ITagInputProps {
  className?: string;
  classNameError?: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string[];
  errorValue?: string[];
  size?: TagInputSize;
  error?: string;
  label?: string | React.ReactNode;
  helpText?: string;
  limit?: number;
  variant?: TagVariant;
  maxTags?: number;
  maxTagContent?: string;
  required?: boolean;
  duplicateValueCheck?: boolean;
  duplicateValueMessage?: string;
  onChange?: (value: string[]) => void;
  separators?: string[];
  iconLeft?: React.ReactNode;
}

const TagInput = ({
  className,
  classNameError,
  disabled = false,
  placeholder,
  value,
  errorValue,
  size = 'md',
  error,
  required,
  label,
  limit,
  helpText,
  maxTags,
  maxTagContent,
  variant = 'light',
  duplicateValueCheck = true,
  duplicateValueMessage = 'This value is already added',
  onChange,
  separators,
  iconLeft,
}: ITagInputProps) => {
  const [query, setQuery] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const trans = useTranslations();
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCheckDuplicate = useCallback(() => {
    const trimmedQuery = query.trim();

    if (!duplicateValueCheck || !value?.includes(trimmedQuery)) {
      duplicateValueCheck && setDuplicate(false);
    } else {
      duplicateValueCheck && setDuplicate(true);
    }
  }, [duplicateValueCheck, query, value]);

  useEffect(() => {
    if (duplicateValueCheck) {
      handleCheckDuplicate();
    }
  }, [duplicateValueCheck, handleCheckDuplicate, query]);

  const handleAddTag = () => {
    const trimmedQuery = query.trim();

    if (/^\s*$/.test(trimmedQuery) || !onChange || value === undefined) return;

    if (!duplicateValueCheck || !value.includes(trimmedQuery)) {
      onChange([...value, trimmedQuery]);
      setQuery('');
    }
  };

  const handleCompositionEnd = () => {
    if (!isComposing) {
      return;
    }
    setIsComposing(false);
  };

  const isEnventCommaSeparators = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    return separators?.includes(event.key);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (event.key === 'Enter' ||
        event.key === 'Tab' ||
        isEnventCommaSeparators(event)) &&
      !isComposing
    ) {
      event.preventDefault();
      handleAddTag();
    }
  };

  const deleteItem = (index: number) => {
    if (value && onChange) {
      const newVal = value.filter((_i, i) => i !== index);
      onChange(newVal);
    }
  };

  const displayedItems: string[] = limit
    ? value
      ? value.slice(0, limit)
      : []
    : (value ?? []);

  return (
    <>
      {label && (
        <FormLabel label={label} required={required} className="mb-2" />
      )}
      <label htmlFor="input">
        <div
          className={clsx(
            'box-border flex min-h-full flex-wrap items-center justify-start rounded-lg',
            error && '!border-error-main',
            disabled && 'cursor-not-allowed opacity-75',
            variant === 'primary' &&
              'border border-other bg-other focus-within:border-action-active hover:border-action-active',
            variant === 'light' && 'bg-white',
            className
          )}
        >
          {!!value && (
            <ul
              className={clsx(
                'flex w-full flex-wrap items-center gap-2.5 py-0.5',
                size === 'lg' && 'px-3 py-2',
                size === 'md' && 'min-h-8 px-2',
                size === 'sm' && 'min-h-9 px-2 py-[6px]'
              )}
            >
              {displayedItems.map((item: string, index) => (
                <li
                  key={index}
                  value={item}
                  className={clsx('max-w-[260px]')}
                  onClick={(e) => e.preventDefault()}
                >
                  <Tag
                    size={size}
                    icon={<X className="h-full w-full" />}
                    onRemove={() => {
                      deleteItem(index);
                    }}
                    iconLeft={errorValue?.includes(item) && iconLeft}
                    variant="main"
                    className={clsx(
                      variant === 'primary' && 'bg-white',
                      disabled && 'pointer-events-none opacity-75',
                      errorValue?.includes(item) &&
                        '!h-6 !gap-[10px] !border !border-warning-main !px-1.5'
                    )}
                    label={item}
                  />
                </li>
              ))}
              {limit && value.length > limit && (
                <li
                  className="flex justify-start"
                  onClick={(e) => e.preventDefault()}
                >
                  <Tag
                    size={size}
                    className={clsx(
                      disabled && 'opacity-75',
                      variant === 'primary' && 'bg-white'
                    )}
                    variant="main"
                    label={`+${value.length - limit}`}
                  />
                </li>
              )}
              <input
                onChange={(e) => setQuery(e.target.value)}
                id="input"
                value={query}
                pattern={NO_LEADING_WHITE_SPACE_REGEX.source}
                className={twMerge(
                  clsx(
                    disabled && 'pointer-events-none',
                    maxTags && maxTags === value.length ? 'hidden' : 'flex',
                    'w-full min-w-[100px] max-w-full flex-1 overflow-hidden overflow-x-auto rounded-[10px] bg-other pl-1.5 focus:outline-0',
                    variant === 'light' && 'bg-white'
                  )
                )}
                onBlur={handleAddTag}
                placeholder={value?.length ? '' : placeholder}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                onKeyDown={handleKeyDown}
              />
            </ul>
          )}
        </div>

        <div
          className={clsx(
            'text-error-main flex w-full capitalize',
            size === 'lg' && 'mx-3 mt-1 text-1xs',
            size === 'md' && 'mx-2.5 mt-1 text-1xs',
            size === 'sm' && 'mx-2 mt-0.5 text-2xs',
            helpText || maxTags ? 'justify-between' : 'justify-start',
            maxTags && '!mx-0'
          )}
        >
          <div>
            {!!error && (
              <p className="mt-2 text-xs font-normal text-error">{error}</p>
            )}
            {duplicate && duplicateValueCheck && (
              <p className="mt-2 text-xs font-normal text-error">
                {duplicateValueMessage}
              </p>
            )}
          </div>
          <p className="flex flex-col text-[11px] text-text-primary">
            {helpText}
            {maxTags && (
              <span
                className={clsx(
                  'mt-1 self-end',
                  !!value &&
                    !!maxTags &&
                    maxTags <= value?.length &&
                    'text-error'
                )}
              >
                {`${value?.length} / ${maxTags}${maxTagContent ? ` ${maxTagContent}` : ''}`}
              </span>
            )}
          </p>
        </div>
      </label>
    </>
  );
};

export default TagInput;
