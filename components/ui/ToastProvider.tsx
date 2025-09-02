'use client'

import { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react'

type ToastType = 'success' | 'error' | 'info'

export interface ToastItem {
  id: string
  title?: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastContextType {
  show: (message: string, type?: ToastType, options?: Partial<Omit<ToastItem, 'id' | 'message' | 'type'>>) => void
  success: (message: string, options?: Partial<Omit<ToastItem, 'id' | 'message' | 'type'>>) => void
  error: (message: string, options?: Partial<Omit<ToastItem, 'id' | 'message' | 'type'>>) => void
  info: (message: string, options?: Partial<Omit<ToastItem, 'id' | 'message' | 'type'>>) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const remove = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const show = useCallback<ToastContextType['show']>((message, type = 'info', options) => {
    const id = Math.random().toString(36).slice(2)
    const duration = options?.duration ?? 3000
    const item: ToastItem = { id, message, type, title: options?.title, duration }
    setToasts(prev => [...prev, item])
  }, [remove])

  const value = useMemo<ToastContextType>(() => ({
    show,
    success: (msg, opt) => show(msg, 'success', opt),
    error: (msg, opt) => show(msg, 'error', opt),
    info: (msg, opt) => show(msg, 'info', opt),
  }), [show])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] space-y-3">
        {toasts.map(t => (
          <Toast key={t.id} toast={t} onClose={() => remove(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

function classNames(...args: (string | false | undefined)[]) {
  return args.filter(Boolean).join(' ')
}

function Toast({ toast, onClose }: { toast: ToastItem; onClose: () => void }) {
  const color = toast.type === 'success' ? 'green' : toast.type === 'error' ? 'red' : 'blue'
  const Icon = toast.type === 'success' ? SuccessIcon : toast.type === 'error' ? ErrorIcon : InfoIcon
  const [visible, setVisible] = useState(false)

  // mount animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  // auto close
  useEffect(() => {
    if (!toast.duration || toast.duration <= 0) return
    const t = setTimeout(() => handleClose(), toast.duration)
    return () => clearTimeout(t)
  }, [toast.duration])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 200)
  }
  return (
    <div className={classNames(
      'w-80 shadow-lg rounded-md border p-3 bg-white transform transition-all duration-200',
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
      `border-${color}-200`
    )} role="status" aria-live="polite">
      <div className="flex items-start gap-3">
        <div className={classNames(`text-${color}-600`)}>
          <Icon />
        </div>
        <div className="flex-1">
          {toast.title && <div className="font-medium mb-0.5">{toast.title}</div>}
          <div className="text-sm text-gray-700">{toast.message}</div>
        </div>
        <button aria-label="close" onClick={handleClose} className="text-gray-400 hover:text-gray-600">
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}

function SuccessIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
  )
}
function ErrorIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/></svg>
  )
}
function InfoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zM9 9a1 1 0 112 0v5a1 1 0 11-2 0V9zm1-4a1 1 0 100 2 1 1 0 000-2z"/></svg>
  )
}
function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
  )
}


