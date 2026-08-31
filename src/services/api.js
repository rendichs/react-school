import API_BASE_URL from "@/config/api";

export const api = {
  async login(username, password) {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.non_field_errors?.[0] ||
          data?.detail ||
          "Username atau password salah."
      );
    }

    return data;
  },
};