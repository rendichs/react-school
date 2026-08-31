const AUTH_KEY = "mora_auth";

const authService = {
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
    } catch (error) {
      console.error("Invalid auth data:", error);
      localStorage.removeItem(AUTH_KEY);
      return null;
    }
  },

  getToken() {
    return this.get()?.token || null;
  },

  isAuthenticated() {
    return Boolean(this.getToken());
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
  },
};

export { authService };

export default authService;