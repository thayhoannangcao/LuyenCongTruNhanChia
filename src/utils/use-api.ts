import { useCallback } from 'react';
import { useToastOptional } from '@/components/ui/ToastProvider';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface RequestOptions<TBody = any> {
  body?: TBody;
  headers?: Record<string, string>;
  showSuccessToast?: boolean;
  successMessage?: string;
  showErrorToast?: boolean;
}

interface ApiResult<TData = any> {
  success: boolean;
  data?: TData;
  error?: string;
  status?: number;
}

export function useApi() {
  const toast = useToastOptional();

  const request = useCallback(
    async <TData = any, TBody = any>(
      url: string,
      method: HttpMethod,
      options: RequestOptions<TBody> = {}
    ): Promise<ApiResult<TData>> => {
      const {
        body,
        headers,
        showSuccessToast = false,
        successMessage,
        showErrorToast = true,
      } = options;

      try {
        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...(headers || {}),
          },
          ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
        });

        const isJson = res.headers
          .get('content-type')
          ?.includes('application/json');
        const json = isJson ? await res.json().catch(() => ({})) : {};

        if (!res.ok) {
          const message =
            (json as any)?.error || `Request failed (${res.status})`;
          if (showErrorToast) toast.error(message);
          return { success: false, error: message, status: res.status };
        }

        if (showSuccessToast && successMessage) {
          toast.success(successMessage);
        }

        return { success: true, data: json as TData, status: res.status };
      } catch (e: any) {
        const message = e?.message || 'Network error';
        if (showErrorToast) toast.error(message);
        return { success: false, error: message };
      }
    },
    [toast]
  );

  const get = useCallback(
    <TData = any>(url: string, options?: RequestOptions) => {
      return request<TData>(url, 'GET', options);
    },
    [request]
  );

  const post = useCallback(
    <TData = any, TBody = any>(
      url: string,
      body?: TBody,
      options?: RequestOptions<TBody>
    ) => {
      return request<TData, TBody>(url, 'POST', { ...(options || {}), body });
    },
    [request]
  );

  const patch = useCallback(
    <TData = any, TBody = any>(
      url: string,
      body?: TBody,
      options?: RequestOptions<TBody>
    ) => {
      return request<TData, TBody>(url, 'PATCH', { ...(options || {}), body });
    },
    [request]
  );

  const del = useCallback(
    <TData = any>(url: string, options?: RequestOptions) => {
      return request<TData>(url, 'DELETE', options);
    },
    [request]
  );

  return { get, post, patch, del };
}
