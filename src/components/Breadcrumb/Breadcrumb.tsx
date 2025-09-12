'use client';
import { clsx } from 'clsx';
import Link from 'next/link';
import type { ReactNode } from 'react';
import React from 'react';
import TruncateText from '../TruncateText';

interface IBreadcrumbItem {
  href?: string;
  label?: string;
}

interface IBreadcrumbProps {
  items: IBreadcrumbItem[];
  className?: string;
  children?: ReactNode;
}

function Breadcrumb({
  items,
  className,
  children,
}: Readonly<IBreadcrumbProps>) {
  return (
    <div className="fixed left-0 right-0 top-0 z-40 flex h-[--header-height] w-full items-center justify-between gap-2 border-b border-b-divider bg-white px-6 py-[15px]">
      <div className="pl-[--sidebar-width]">
        <div className={clsx('flex flex-wrap items-center gap-2', className)}>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="block max-w-[150px] truncate text-sm font-normal hover:underline min-[1440px]:max-w-[200px]"
                >
                  <TruncateText
                    className="truncate"
                    text={item.label ?? ''}
                    classNameContentTooltip="break-all max-h-[300px] overflow-y-auto"
                  />
                </Link>
              ) : (
                <div className="max-w-[300px] flex-1 truncate text-base font-normal text-text-primary min-[1440px]:max-w-[600px] min-[1920px]:max-w-[1280px]">
                  <TruncateText
                    className="truncate"
                    text={item.label ?? ''}
                    classNameContentTooltip="break-all max-h-[300px] overflow-y-auto"
                  />
                </div>
              )}
              {index < items.length - 1 && (
                <span className="text-sm text-text-secondary">/</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}

export default Breadcrumb;
