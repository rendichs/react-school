const AUTH_KEY = "mora_auth";

export const authService = {
  save(authData) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
  },

  get() {
    const data = localStorage.getItem(AUTH_KEY);

    if (!data) {
      return null;
    }

    try {
      return JSON.parse(data);
    } catch {
      localStorage.removeItem(AUTH_KEY);
      return null;
    }
  },

  getToken() {
    const auth = this.get();
    return auth?.token || null;
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
  },
};