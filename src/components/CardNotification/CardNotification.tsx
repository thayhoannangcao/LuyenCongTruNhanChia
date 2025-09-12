import React from 'react';
import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa6';
import { FaChevronRight } from 'react-icons/fa6';
import { CardNotificationStatus } from '@/src/enums/status.enum';

interface StatusProps {
  value?: CardNotificationStatus;
  label?: React.ReactNode;
}

interface CardNotificationProps {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  status?: StatusProps;
  onClick?: () => void;
  className?: string;
}
function CardNotification({
  title,
  description,
  status,
  onClick,
  className,
}: CardNotificationProps) {
  return (
    <div
      className={clsx(
        'bg-neutral-white group relative flex w-full items-center gap-4 rounded-[10px] p-6 shadow-custom-md transition-all',
        className
      )}
    >
      <div className="flex w-full flex-col gap-[13px]">
        <h3 className="text-neutral-dark text-2xl font-bold">{title}</h3>
        {description && (
          <p className="text-neutral-dark text-sm font-normal">{description}</p>
        )}
        {status && (
          <div
            className={clsx(
              'text-content-pending flex items-center text-sm font-normal',
              status.value === CardNotificationStatus.SUCCESS &&
                '!text-content-success',
              status.value === CardNotificationStatus.CANCEL &&
                '!text-content-cancel'
            )}
          >
            {status.value === CardNotificationStatus.SUCCESS && (
              <FaCheck className="mr-2" />
            )}
            {status.label}
          </div>
        )}
      </div>
      <FaChevronRight
        onClick={onClick}
        className="text-content-neutral-dark-gray text-neutral-dark h-4 w-3 cursor-pointer"
      />
    </div>
  );
}

export default CardNotification;
