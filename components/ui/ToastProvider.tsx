'use client';

import { createContext, useContext, useMemo, useCallback } from 'react';
import {
  ToastifyContainer,
  toastShow,
  toastSuccess,
  toastError,
  toastInfo,
} from '@/src/components/Toastify';

type ToastType = 'success' | 'error' | 'info';

interface ToastContextType {
  show: (
    message: string,
    type?: ToastType,
    options?: { title?: string; duration?: number }
  ) => void;
  success: (
    message: string,
    options?: { title?: string; duration?: number }
  ) => void;
  error: (
    message: string,
    options?: { title?: string; duration?: number }
  ) => void;
  info: (
    message: string,
    options?: { title?: string; duration?: number }
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const show = useCallback<ToastContextType['show']>(
    (message, type, options) => {
      const finalType: ToastType = type ?? 'info';
      toastShow(message, finalType, options);
    },
    []
  );

  const value = useMemo<ToastContextType>(
    () => ({
      show,
      success: (msg, opt) => toastSuccess(msg, opt),
      error: (msg, opt) => toastError(msg, opt),
      info: (msg, opt) => toastInfo(msg, opt),
    }),
    [show]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastifyContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function useToastOptional(): ToastContextType {
  const ctx = useContext(ToastContext);
  if (ctx) return ctx;
  // No-op fallbacks for environments without provider (e.g., SSR prerender)
  return {
    show: () => {},
    success: () => {},
    error: () => {},
    info: () => {},
  };
}
