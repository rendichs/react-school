import API_BASE_URL from "@/config/api";
import authService from "@/services/auth";

const request = async (endpoint, options = {}) => {
  const token = authService.getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const error = new Error(
      data?.detail ||
        data?.non_field_errors?.[0] ||
        "Terjadi kesalahan pada server."
    );

    error.status = response.status;
    error.data = data;

    throw error;
  }

  return data;
};

export const api = {
  login: async (username, password) =>
    request("/login/", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    }),

  get: (endpoint) =>
    request(endpoint, {
      method: "GET",
    }),

  post: (endpoint, body) =>
    request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (endpoint, body) =>
    request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: (endpoint, body) =>
    request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: (endpoint) =>
    request(endpoint, {
      method: "DELETE",
    }),
};