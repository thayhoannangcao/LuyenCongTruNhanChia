'use client'

import { ToastContainer, toast, type ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export type ToastifyType = 'success' | 'error' | 'info'

export interface ToastifyShowOptions {
  title?: string
  duration?: number
}

export function ToastifyContainer() {
  return (
    <ToastContainer
      position="top-right"
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  )
}

export function toastShow(message: string, type: ToastifyType = 'info', options?: ToastifyShowOptions) {
  const toastOptions: ToastOptions = {
    autoClose: options?.duration ?? 3000,
  }

  const content = options?.title ? `${options.title}: ${message}` : message

  if (type === 'success') return toast.success(content, toastOptions)
  if (type === 'error') return toast.error(content, toastOptions)
  return toast.info(content, toastOptions)
}

export function toastSuccess(message: string, options?: ToastifyShowOptions) {
  return toastShow(message, 'success', options)
}

export function toastError(message: string, options?: ToastifyShowOptions) {
  return toastShow(message, 'error', options)
}

export function toastInfo(message: string, options?: ToastifyShowOptions) {
  return toastShow(message, 'info', options)
}


