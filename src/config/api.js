const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    "VITE_API_BASE_URL belum dikonfigurasi. Silakan cek file .env."
  );
}

export default API_BASE_URL;