import { api } from "@/services/api";
import { authService } from "@/services/auth";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getDashboardByRole } from "@/utils/authRedirect";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  User,
  ArrowLeft,
} from "lucide-react";




import MoraIcon from "@/assets/images/logo/mora-icon.png";
import SchoolImage from "@/assets/images/school/man2-pontianak.webp";


const LoginPage = () => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return (
      <Navigate
        to={getDashboardByRole(user?.role)}
        replace
      />
    );
  }
  
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await api.login(
        form.username,
        form.password
      );

      login(data);

      navigate(getDashboardByRole(data.role), {
        replace: true,
      });

    } catch (error) {
      setError(
        error.message ||
          "Login gagal. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center px-5 py-10"
      style={{
        backgroundImage: `url(${SchoolImage})`,
      }}
    >
      {/* Green overlay */}
      <div className="absolute inset-0 bg-[#064E3B]/45" />

      {/* Subtle green gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-950/90 via-green-800/65 to-emerald-950/50" />

      {/* Background decoration */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-green-300/10 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-[500px]">
        {/* Back */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Kembali ke Beranda
        </Link>

        {/* MORA BRAND */}
        <div className="mb-7 flex flex-col items-center text-center text-white">
          <img
            src={MoraIcon}
            alt="MORA"
            className="h-20 w-20 object-contain drop-shadow-lg"
          />

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white drop-shadow-lg">
            MORA
          </h1>

          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-green-100">
            Madrasah Learning Platform
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="rounded-2xl border border-white/50 bg-white p-7 shadow-2xl shadow-black/20 sm:p-9">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              Selamat Datang di{" "}
              <span className="text-green-600">MORA</span>
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Masuk untuk mengakses akun Anda
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* USERNAME */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email atau Username
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="username"
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Masukkan email atau username"
                  autoComplete="username"
                  className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                  autoComplete="current-password"
                  className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-green-600"
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* FORGOT */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm font-medium text-green-700 transition hover:text-green-800"
              >
                Lupa password?
              </button>
            </div>

            {/* LOGIN */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-lg bg-green-600 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:cursor-not-allowed disabled:opacity-70">
              {loading ? "Memproses..." : "Masuk"}
            </button>

            {/* DIVIDER */}
            <div className="flex items-center gap-4 py-2">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-xs text-slate-400">
                atau masuk dengan
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* GOOGLE */}
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <span className="font-bold text-[#4285F4]">G</span>
              Masuk dengan Google
            </button>
          </form>

          <p className="mt-7 text-center text-xs text-slate-500">
            Belum punya akun?{" "}
            <span className="font-semibold text-green-700">
              Hubungi administrator madrasah
            </span>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-white/70">
          © 2026 MORA — Madrasah Learning Platform
        </p>
      </div>
    </main>
  );
};

export default LoginPage;