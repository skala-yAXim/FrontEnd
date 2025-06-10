import { serverFetch } from "./fetcher";

export const serverApi = {
  get: <T>(url: string, options = {}) => serverFetch<T>(url, options),

  post: <T>(url: string, body: any, options = {}) =>
    serverFetch<T>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(url: string, body: any, options = {}) =>
    serverFetch<T>(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: <T>(url: string, options = {}) =>
    serverFetch<T>(url, { ...options, method: "DELETE" }),
};
