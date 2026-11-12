// Centralized API Client for Noor Plastic Industries Platform
// Connects frontend to Express + Prisma Backend REST API

import {
  clearAuthSession,
  getStoredToken,
  notifyAuthExpired,
  setAuthSession,
  ADMIN_USER_KEY,
  AuthSessionUser,
} from "./auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

class ApiClient {
  private getHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: "application/json",
      ...customHeaders,
    };

    if (typeof window !== "undefined") {
      const token = getStoredToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private static inflightGets = new Map<string, Promise<ApiResponse<any>>>();
  private static getCache = new Map<string, { data: ApiResponse<any>; expiresAt: number }>();
  private static readonly GET_CACHE_TTL_MS = 15_000;

  public invalidateCache(prefix?: string) {
    if (!prefix) {
      ApiClient.getCache.clear();
      return;
    }
    for (const key of ApiClient.getCache.keys()) {
      if (key.includes(prefix)) {
        ApiClient.getCache.delete(key);
      }
    }
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${API_BASE_URL}${cleanEndpoint}`;
    const headers = this.getHeaders((options.headers as Record<string, string>) || {});
    const method = (options.method || "GET").toUpperCase();

    // If body is FormData, do not set Content-Type header (browser sets boundary automatically)
    if (options.body instanceof FormData) {
      delete headers["Content-Type"];
    } else if (options.body && typeof options.body === "string") {
      headers["Content-Type"] = "application/json";
    }

    if (method !== "GET") {
      ApiClient.getCache.clear();
    }

    const canUseGetCache = method === "GET" && options.cache !== "no-store" && !options.signal;
    const cacheKey = `${url}::${headers["Authorization"] || ""}`;

    if (canUseGetCache) {
      const cached = ApiClient.getCache.get(cacheKey);
      if (cached && cached.expiresAt > Date.now()) {
        return cached.data as ApiResponse<T>;
      }
      const inflight = ApiClient.inflightGets.get(cacheKey);
      if (inflight) {
        return inflight as Promise<ApiResponse<T>>;
      }
    }

    const executeFetch = async (): Promise<ApiResponse<T>> => {
      const controller = new AbortController();
      const timeoutMs =
        options.body instanceof FormData ? 30_000 : method === "GET" ? 8_000 : 15_000;

      const onExternalAbort = () => controller.abort();
      if (options.signal) {
        if (options.signal.aborted) {
          controller.abort();
        } else {
          options.signal.addEventListener("abort", onExternalAbort, { once: true });
        }
      }

      const timeoutId = globalThis.setTimeout(() => controller.abort(), timeoutMs);

      try {
        const response = await fetch(url, {
          ...options,
          method,
          headers,
          credentials: "include",
          signal: controller.signal,
        });

        const json = await response.json().catch(() => null);

        if (!response.ok) {
          if (
            response.status === 401 &&
            cleanEndpoint !== "/auth/login" &&
            cleanEndpoint !== "/auth/logout"
          ) {
            ApiClient.getCache.clear();
            notifyAuthExpired("expired");
          }
          throw new Error(
            json?.message || `HTTP ${response.status}: ${response.statusText}`
          );
        }

        if (canUseGetCache) {
          ApiClient.getCache.set(cacheKey, {
            data: json,
            expiresAt: Date.now() + ApiClient.GET_CACHE_TTL_MS,
          });
        }

        return json;
      } catch (error: any) {
        const message =
          error?.name === "AbortError" ? `Request timed out after ${timeoutMs}ms` : error?.message;
        console.warn(`[ApiClient] Request to ${endpoint} failed:`, message);
        throw error?.name === "AbortError" ? new Error(message) : error;
      } finally {
        globalThis.clearTimeout(timeoutId);
        if (options.signal) {
          options.signal.removeEventListener("abort", onExternalAbort);
        }
      }
    };

    if (canUseGetCache) {
      const promise = executeFetch().finally(() => {
        ApiClient.inflightGets.delete(cacheKey);
      });
      ApiClient.inflightGets.set(cacheKey, promise);
      return promise;
    }

    return executeFetch();
  }

  // Auth Endpoints
  auth = {
    login: async (email: string, password: string) => {
      ApiClient.getCache.clear();
      const res = await this.request<{ user: AuthSessionUser; token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (res.data?.token && typeof window !== "undefined") {
        setAuthSession(res.data.token, res.data.user);
      }
      return res;
    },
    me: async () => {
      const res = await this.request<any>("/auth/me", { cache: "no-store" });
      const user: AuthSessionUser | undefined = res.data?.user || res.data;
      if (user && typeof window !== "undefined") {
        localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
      }
      return { ...res, data: user as AuthSessionUser };
    },
    changePassword: async (currentPassword: string, newPassword: string) => {
      return this.request<null>("/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
    },
    logout: async () => {
      try {
        return await this.request("/auth/logout", { method: "POST" }).catch(() => ({
          success: true,
          data: null,
        }));
      } finally {
        ApiClient.getCache.clear();
        clearAuthSession();
      }
    },
  };

  // Pages & Visual Page Builder CMS
  pages = {
    getAll: async () => {
      return this.request<any[]>("/pages");
    },
    getById: async (id: string) => {
      return this.request<any>(`/pages/${id}`);
    },
    getBySlug: async (slug: string) => {
      return this.request<any>(`/pages/slug/${slug}`);
    },
    create: async (data: {
      title: string;
      slug: string;
      status?: string;
      metaTitle?: string;
      metaDescription?: string;
    }) => {
      return this.request<any>("/pages", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    update: async (id: string, data: any) => {
      return this.request<any>(`/pages/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    delete: async (id: string) => {
      return this.request<any>(`/pages/${id}`, {
        method: "DELETE",
      });
    },
    publish: async (id: string, data?: any) => {
      return this.request<any>(`/pages/${id}/publish`, {
        method: "POST",
        body: data ? JSON.stringify(data) : undefined,
      });
    },
    saveDraft: async (id: string, data: any) => {
      const body = Array.isArray(data)
        ? { sections: data }
        : typeof data === "object"
        ? data
        : { draftContent: data };
      return this.request<any>(`/pages/${id}/draft`, {
        method: "POST",
        body: JSON.stringify(body),
      });
    },
    reorderSections: async (id: string, sectionOrders: { id: string; sortOrder: number }[]) => {
      return this.request<any>(`/pages/${id}/reorder`, {
        method: "PUT",
        body: JSON.stringify({ sections: sectionOrders }),
      });
    },
    // Revisions
    getRevisions: async (id: string) => {
      return this.request<any[]>(`/pages/${id}/revisions`);
    },
    saveRevision: async (id: string, note?: string) => {
      return this.request<any>(`/pages/${id}/revisions`, {
        method: "POST",
        body: JSON.stringify({ note }),
      });
    },
    restoreRevision: async (id: string, revisionId: string) => {
      return this.request<any>(`/pages/${id}/revisions/${revisionId}/restore`, {
        method: "POST",
      });
    },
    // Section CRUD inside page builder
    createSection: async (pageId: string, data: any) => {
      return this.request<any>(`/pages/${pageId}/sections`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    updateSection: async (pageId: string, sectionId: string, data: any) => {
      return this.request<any>(`/pages/${pageId}/sections/${sectionId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    deleteSection: async (pageId: string, sectionId: string) => {
      return this.request<any>(`/pages/${pageId}/sections/${sectionId}`, {
        method: "DELETE",
      });
    },
    duplicateSection: async (pageId: string, sectionId: string) => {
      return this.request<any>(`/pages/${pageId}/sections/${sectionId}/duplicate`, {
        method: "POST",
      });
    },
  };

  // Products
  products = {
    getAll: async (params: { category?: string; search?: string; status?: string } = {}) => {
      const query = new URLSearchParams();
      if (params.category) query.set("category", params.category);
      if (params.search) query.set("search", params.search);
      if (params.status) query.set("status", params.status);
      const qs = query.toString();
      return this.request<any[]>(`/products${qs ? `?${qs}` : ""}`);
    },
    getById: async (id: string) => {
      return this.request<any>(`/products/${id}`);
    },
    getBySlug: async (slug: string) => {
      return this.request<any>(`/products/slug/${slug}`);
    },
    create: async (data: any) => {
      return this.request<any>("/products", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    update: async (id: string, data: any) => {
      return this.request<any>(`/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    delete: async (id: string) => {
      return this.request<any>(`/products/${id}`, {
        method: "DELETE",
      });
    },
  };

  // Categories
  categories = {
    getAll: async () => {
      return this.request<any[]>("/categories");
    },
    getById: async (id: string) => {
      return this.request<any>(`/categories/${id}`);
    },
    create: async (data: any) => {
      return this.request<any>("/categories", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    update: async (id: string, data: any) => {
      return this.request<any>(`/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    delete: async (id: string) => {
      return this.request<any>(`/categories/${id}`, {
        method: "DELETE",
      });
    },
  };

  // Centralized Link Registry
  links = {
    getAll: async () => {
      return this.request<any[]>("/links");
    },
    getById: async (id: string) => {
      return this.request<any>(`/links/${id}`);
    },
    create: async (data: {
      key: string;
      label: string;
      url: string;
      type?: string;
      target?: string;
      category?: string;
    }) => {
      return this.request<any>("/links", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    update: async (id: string, data: any) => {
      return this.request<any>(`/links/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    delete: async (id: string) => {
      return this.request<any>(`/links/${id}`, {
        method: "DELETE",
      });
    },
  };

  // Shared helper for ordered CRUD modules
  private createCrudClient(basePath: string) {
    return {
      getPublic: async () => this.request<any[]>(basePath),
      getAll: async (includeAll = true) =>
        this.request<any[]>(`${basePath}${includeAll ? "?all=true" : ""}`),
      getById: async (id: string) => this.request<any>(`${basePath}/${id}`),
      getBySlug: async (slug: string) =>
        this.request<any>(`${basePath}/slug/${encodeURIComponent(slug)}`),
      create: async (data: any) =>
        this.request<any>(basePath, {
          method: "POST",
          body: JSON.stringify(data),
        }),
      update: async (id: string, data: any) =>
        this.request<any>(`${basePath}/${id}`, {
          method: "PUT",
          body: JSON.stringify(data),
        }),
      delete: async (id: string) =>
        this.request<any>(`${basePath}/${id}`, {
          method: "DELETE",
        }),
      reset: async () =>
        this.request<any[]>(`${basePath}/reset`, {
          method: "POST",
        }),
    };
  }

  // Media Library & Imaple Uploader
  media = {
    getAll: async (params: { category?: string; search?: string } = {}) => {
      const query = new URLSearchParams();
      if (params.category) query.set("category", params.category);
      if (params.search) query.set("search", params.search);
      const qs = query.toString();
      return this.request<any[]>(`/media/assets${qs ? `?${qs}` : ""}`);
    },
    upload: async (file: File, meta: { altText?: string; category?: string } = {}) => {
      const formData = new FormData();
      formData.append("file", file);
      if (meta.altText) formData.append("altText", meta.altText);
      if (meta.category) formData.append("category", meta.category);

      return this.request<any>("/media/upload", {
        method: "POST",
        body: formData,
      });
    },
    delete: async (id: string) => {
      return this.request<any>(`/media/assets/${id}`, {
        method: "DELETE",
      });
    },
    replace: async (id: string, file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return this.request<any>(`/media/assets/${id}`, {
        method: "PUT",
        body: formData,
      });
    },
  };

  // Dynamic CMS Collections
  mediaStories = this.createCrudClient("/media/stories");
  tvNews = this.createCrudClient("/tv-news");
  blogs = this.createCrudClient("/blogs");
  caseStudies = this.createCrudClient("/case-studies");
  certificates = this.createCrudClient("/certificates");
  careerJobs = this.createCrudClient("/careers/jobs");

  // Navigation Menus
  navigation = {
    getAll: async () => {
      return this.request<any[]>("/navigation");
    },
    getTree: async (code: string) => {
      return this.request<any[]>(`/navigation/tree/${code}`);
    },
    saveTree: async (code: string, items: any[]) => {
      return this.request<any>(`/navigation/tree/${code}`, {
        method: "PUT",
        body: JSON.stringify({ items }),
      });
    },
    createItem: async (menuId: string, data: any) => {
      return this.request<any>(`/navigation/${menuId}/items`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    updateItem: async (itemId: string, data: any) => {
      return this.request<any>(`/navigation/items/${itemId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    deleteItem: async (itemId: string) => {
      return this.request<any>(`/navigation/items/${itemId}`, {
        method: "DELETE",
      });
    },
  };

  // Site Settings & Branding
  settings = {
    getAll: async () => {
      return this.request<any[]>("/settings");
    },
    getMap: async () => {
      return this.request<Record<string, string>>("/settings/map");
    },
    updateBatch: async (settings: { key: string; value: string }[]) => {
      return this.request<any>("/settings/batch", {
        method: "POST",
        body: JSON.stringify({ settings }),
      });
    },
    update: async (key: string, value: string) => {
      return this.request<any>(`/settings/${key}`, {
        method: "PUT",
        body: JSON.stringify({ value }),
      });
    },
  };

  // User Management
  users = {
    getAll: async () => {
      return this.request<any[]>("/users");
    },
    create: async (data: any) => {
      return this.request<any>("/users", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    update: async (id: string, data: any) => {
      return this.request<any>(`/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    delete: async (id: string) => {
      return this.request<any>(`/users/${id}`, {
        method: "DELETE",
      });
    },
  };

  // Analytics Overview
  analytics = {
    getOverview: async () => {
      return this.request<any>("/analytics/overview");
    },
  };

  // Careers & Applications
  careers = {
    getAll: async () => {
      return this.request<any[]>("/careers");
    },
    getById: async (id: string) => {
      return this.request<any>(`/careers/${id}`);
    },
    create: async (data: any) => {
      return this.request<any>("/careers", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    updateStatus: async (id: string, status: string) => {
      return this.request<any>(`/careers/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    },
    delete: async (id: string) => {
      return this.request<any>(`/careers/${id}`, {
        method: "DELETE",
      });
    },
  };

  // RFQ & Inquiries
  inquiries = {
    getAll: async () => {
      return this.request<any[]>("/inquiries");
    },
    submit: async (data: any) => {
      return this.request<any>("/inquiries", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    updateStatus: async (id: string, status: string) => {
      return this.request<any>(`/inquiries/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    },
  };

  // Homepage Hero Banners
  banners = {
    getPublic: async () => {
      return this.request<any[]>("/banners");
    },
    getAll: async () => {
      return this.request<any[]>("/banners?all=true");
    },
    getById: async (id: string) => {
      return this.request<any>(`/banners/${id}`);
    },
    create: async (data: any) => {
      return this.request<any>("/banners", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    update: async (id: string, data: any) => {
      return this.request<any>(`/banners/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    reorder: async (orderedIds: string[]) => {
      return this.request<any[]>("/banners/reorder", {
        method: "PUT",
        body: JSON.stringify({ orderedIds }),
      });
    },
    reset: async () => {
      return this.request<any[]>("/banners/reset", {
        method: "POST",
      });
    },
    delete: async (id: string) => {
      return this.request<any>(`/banners/${id}`, {
        method: "DELETE",
      });
    },
  };
}

export const api = new ApiClient();
export default api;
