 // Centralized API Client for Xclusive Can Limited & Q Pail Platform
// Connects frontend to Express + Prisma Backend REST API

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
      const token = localStorage.getItem("waterweb_admin_token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
    const headers = this.getHeaders((options.headers as Record<string, string>) || {});

    // If body is FormData, do not set Content-Type header (browser sets boundary automatically)
    if (options.body instanceof FormData) {
      delete headers["Content-Type"];
    } else if (options.body && typeof options.body === "string") {
      headers["Content-Type"] = "application/json";
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const json = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          json?.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return json;
    } catch (error: any) {
      console.warn(`[ApiClient] Request to ${endpoint} failed:`, error.message);
      throw error;
    }
  }

  // Auth Endpoints
  auth = {
    login: async (email: string, password: string) => {
      const res = await this.request<{ user: any; token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (res.data?.token && typeof window !== "undefined") {
        localStorage.setItem("waterweb_admin_token", res.data.token);
        localStorage.setItem("waterweb_admin_user", JSON.stringify(res.data.user));
      }
      return res;
    },
    me: async () => {
      return this.request<{ user: any }>("/auth/me");
    },
    logout: async () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("waterweb_admin_token");
        localStorage.removeItem("waterweb_admin_user");
      }
      return this.request("/auth/logout", { method: "POST" }).catch(() => ({
        success: true,
        data: null,
      }));
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

  // Media Library & Imaple Uploader
  media = {
    getAll: async (params: { category?: string; search?: string } = {}) => {
      const query = new URLSearchParams();
      if (params.category) query.set("category", params.category);
      if (params.search) query.set("search", params.search);
      const qs = query.toString();
      return this.request<any[]>(`/media${qs ? `?${qs}` : ""}`);
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
      return this.request<any>(`/media/${id}`, {
        method: "DELETE",
      });
    },
    replace: async (id: string, file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return this.request<any>(`/media/${id}/replace`, {
        method: "PUT",
        body: formData,
      });
    },
  };

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
}

export const api = new ApiClient();
export default api;
