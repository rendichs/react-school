import React from "react";
import { useAuth } from "@/context/AuthContext";

const MuridDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Dashboard Murid
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Selamat datang kembali,{" "}
          <span className="font-medium text-green-600">
            {user?.nama_lengkap || "Murid"}
          </span>
          .
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm text-slate-500">
            Mata Pelajaran
          </p>

          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            0
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm text-slate-500">
            Materi
          </p>

          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            0
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm text-slate-500">
            Tugas
          </p>

          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            0
          </p>
        </div>
      </div>
    </div>
  );
};

export default MuridDashboard;