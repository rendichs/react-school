import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  GraduationCap,
  BookOpen,
  BarChart3,
  MessageSquare,
  Users,
  User,
  Library,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

import MoraIcon from "@/assets/images/logo/mora-icon.png";

const features = [
  {
    icon: GraduationCap,
    title: "Manajemen Akademik",
    description:
      "Kelola data siswa, guru, kelas, mata pelajaran, dan jadwal dengan lebih mudah.",
    iconClass: "bg-green-100 text-green-600",
  },
  {
    icon: BookOpen,
    title: "Pembelajaran Digital",
    description:
      "Kelola materi, tugas, kuis dan penilaian dalam satu sistem terintegrasi.",
    iconClass: "bg-cyan-100 text-cyan-600",
  },
  {
    icon: BarChart3,
    title: "Laporan & Analitik",
    description:
      "Pantau perkembangan belajar siswa dengan laporan dan analitik yang akurat.",
    iconClass: "bg-amber-100 text-amber-600",
  },
  {
    icon: MessageSquare,
    title: "Komunikasi Terintegrasi",
    description:
      "Fasilitasi komunikasi antara guru, siswa dan orang tua secara efektif.",
    iconClass: "bg-teal-100 text-teal-600",
  },
];

const statistics = [
  {
    value: "500+",
    label: "Madrasah Aktif",
    icon: Users,
  },
  {
    value: "20K+",
    label: "Siswa",
    icon: User,
  },
  {
    value: "2K+",
    label: "Guru",
    icon: GraduationCap,
  },
  {
    value: "10K+",
    label: "Materi Pembelajaran",
    icon: Library,
  },
];

const LandingPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={MoraIcon}
              alt="MORA"
              className="h-11 w-11 object-contain"
            />

            <div className="leading-tight">
              <div className="text-xl font-bold tracking-tight text-slate-900">
                MORA
              </div>
              <div className="text-[8px] font-medium uppercase tracking-[0.08em] text-slate-400">
                Madrasah Learning Platform
              </div>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-9 md:flex">
            <a
              href="#beranda"
              className="text-sm font-medium text-green-700"
            >
              Beranda
            </a>

            <a
              href="#fitur"
              className="text-sm font-medium text-slate-600 transition hover:text-green-600"
            >
              Fitur
            </a>

            <a
              href="#tentang"
              className="text-sm font-medium text-slate-600 transition hover:text-green-600"
            >
              Tentang
            </a>

            <a
              href="#kontak"
              className="text-sm font-medium text-slate-600 transition hover:text-green-600"
            >
              Kontak
            </a>
          </nav>

          <div className="hidden md:block">
            <Link
              to="/login"
              className="inline-flex items-center rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
            >
              Masuk
            </Link>
          </div>

          {/* Mobile button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-slate-700 md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-100 bg-white px-5 py-5 md:hidden">
            <nav className="flex flex-col gap-4">
              <a href="#beranda" onClick={() => setMobileOpen(false)}>
                Beranda
              </a>

              <a href="#fitur" onClick={() => setMobileOpen(false)}>
                Fitur
              </a>

              <a href="#tentang" onClick={() => setMobileOpen(false)}>
                Tentang
              </a>

              <a href="#kontak" onClick={() => setMobileOpen(false)}>
                Kontak
              </a>

              <Link
                to="/login"
                className="rounded-lg bg-green-600 px-5 py-3 text-center font-semibold text-white"
              >
                Masuk
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="beranda"
        className="relative overflow-hidden bg-gradient-to-br from-white via-white to-green-50"
      >
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-green-100/70 blur-3xl" />

        <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-xs font-semibold text-green-700">
              MORA — Madrasah Learning Platform
            </span>

            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl lg:text-[56px]">
              Platform Pembelajaran Digital untuk Madrasah{" "}
              <span className="text-green-600">
                yang Lebih Maju
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 lg:text-lg">
              MORA membantu madrasah dalam mengelola pembelajaran,
              administrasi, dan komunikasi secara digital, terintegrasi dan
              mudah digunakan.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
              >
                Mulai Sekarang
                <ArrowRight size={17} />
              </Link>

              <a
                href="#fitur"
                className="inline-flex items-center rounded-lg border border-green-600 px-6 py-3.5 text-sm font-semibold text-green-700 transition hover:bg-green-50"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="relative">
            <div className="relative mx-auto max-w-[620px]">
              <div className="absolute -right-10 top-20 h-72 w-72 rounded-full bg-green-200/60 blur-2xl" />

              <div className="relative rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/10">
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">
                        MORA Dashboard
                      </div>
                      <div className="mt-1 text-lg font-bold text-slate-800">
                        Selamat Datang
                      </div>
                    </div>

                    <div className="h-9 w-9 rounded-lg bg-green-100 p-2 text-green-600">
                      <GraduationCap size={20} />
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {["Siswa", "Guru", "Kelas"].map((item, index) => (
                      <div
                        key={item}
                        className="rounded-lg bg-white p-4 shadow-sm"
                      >
                        <div className="text-xs text-slate-400">
                          {item}
                        </div>
                        <div className="mt-2 text-xl font-bold text-slate-800">
                          {[320, 23, 22][index]}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 h-44 rounded-xl bg-white p-5 shadow-sm">
                    <div className="flex h-full items-end gap-3">
                      {[35, 48, 42, 65, 58, 78, 70, 88, 82].map(
                        (height, index) => (
                          <div
                            key={index}
                            className="flex-1 rounded-t-md bg-gradient-to-t from-green-600 to-green-300"
                            style={{ height: `${height}%` }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="fitur" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Fitur Unggulan{" "}
              <span className="text-green-600">MORA</span>
            </h2>

            <p className="mt-3 text-slate-500">
              Semua yang dibutuhkan madrasah dalam satu platform.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconClass}`}
                  >
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section id="tentang" className="pb-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 sm:grid-cols-2 lg:grid-cols-4">
            {statistics.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-4 border-b border-slate-200 p-7 last:border-b-0 sm:border-r lg:border-b-0"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Icon size={23} />
                  </div>

                  <div>
                    <div className="text-2xl font-bold text-green-700">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-500">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="kontak" className="bg-[#064E3B] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <img
                  src={MoraIcon}
                  alt="MORA"
                  className="h-12 w-12 object-contain"
                />

                <div>
                  <div className="text-xl font-bold">MORA</div>
                  <div className="text-[8px] uppercase tracking-wider text-green-200">
                    Madrasah Learning Platform
                  </div>
                </div>
              </div>

              <p className="mt-5 max-w-md text-sm leading-6 text-green-100">
                Platform pembelajaran digital untuk madrasah yang terintegrasi,
                modern dan mudah digunakan.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">Navigasi</h4>

              <div className="mt-5 flex flex-col gap-3 text-sm text-green-100">
                <a href="#beranda">Beranda</a>
                <a href="#fitur">Fitur</a>
                <a href="#tentang">Tentang</a>
                <a href="#kontak">Kontak</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold">Platform</h4>

              <div className="mt-5 flex flex-col gap-3 text-sm text-green-100">
                <span>Akademik</span>
                <span>Pembelajaran</span>
                <span>Penilaian</span>
                <span>Laporan</span>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-green-800 pt-6 text-center text-xs text-green-200">
            © 2026 MORA — Madrasah Learning Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;