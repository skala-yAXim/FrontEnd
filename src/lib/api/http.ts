// lib/api.ts

import { customFetch } from "./fetcher";

export const api = {
  get: <T>(url: string) => customFetch<T>(url),

  post: <T>(url: string, body: any, options?: RequestInit) =>
    customFetch<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    }),

  postFormData: <T>(url: string, formData: FormData) =>
    customFetch<T>(url, {
      method: "POST",
      body: formData,
    }),

  put: <T>(url: string, body: any) =>
    customFetch<T>(url, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patchFormData: <T>(url: string, formData: FormData) =>
    customFetch<T>(url, {
      method: "PATCH",
      body: formData,
    }),

  delete: <T>(url: string) => customFetch<T>(url, { method: "DELETE" }),
};

// 사용 예시
// const user = await api.get<User>('/api/me');
// await api.post<User>('/api/login', { email, password });
// await api.postFormData<User>('/api/upload', formData);
