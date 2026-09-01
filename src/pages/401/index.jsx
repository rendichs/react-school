import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
          <ShieldAlert size={32} />
        </div>

        <h1 className="mt-5 text-2xl font-semibold text-slate-900">
          Akses Ditolak
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Anda tidak memiliki hak akses untuk membuka halaman ini.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          Kembali
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;