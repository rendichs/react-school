import React, { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";

const EditGuruModal = ({
  teacher,
  onClose,
  onSave,
  loading = false,
}) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    nama_lengkap: "",
    nip: "",
    jantina: "",
    no_telefon: "",
    alamat: "",
    password: "",
  });

  useEffect(() => {
    if (!teacher) return;

    setForm({
      username: teacher.username || "",
      email: teacher.email || "",
      nama_lengkap: teacher.nama_lengkap || "",
      nip: teacher.nip || "",
      jantina: teacher.jantina || "",
      no_telefon: teacher.no_telefon || "",
      alamat: teacher.alamat || "",
      password: "",
    });
  }, [teacher]);

  if (!teacher) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Edit Guru
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Perbarui informasi akun guru
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-red-500"
          >
            <Icon icon="ph:x" width="20" height="20" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="max-h-[70vh] space-y-4 overflow-y-auto p-6">

            {/* Nama */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Nama Lengkap
              </label>

              <input
                type="text"
                name="nama_lengkap"
                value={form.nama_lengkap}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Username */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* NIP */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                NIP
              </label>

              <input
                type="text"
                name="nip"
                value={form.nip}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Jenis Kelamin */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Jenis Kelamin
              </label>

              <select
                name="jantina"
                value={form.jantina}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              >
                <option value="">
                  Pilih jenis kelamin
                </option>

                <option value="Lelaki">
                  Laki-laki
                </option>

                <option value="Perempuan">
                  Perempuan
                </option>
              </select>
            </div>

            {/* No Telepon */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                No. Telepon
              </label>

              <input
                type="text"
                name="no_telefon"
                value={form.no_telefon}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Alamat */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Alamat
              </label>

              <textarea
                name="alamat"
                value={form.alamat}
                onChange={handleChange}
                rows={3}
                className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Password Baru
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                minLength={8}
                placeholder="Kosongkan jika tidak ingin mengubah"
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />

              <p className="mt-1 text-xs text-slate-400">
                Minimal 8 karakter. Kosongkan jika password tidak ingin diubah.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && (
                <Icon
                  icon="ph:spinner"
                  width="18"
                  height="18"
                  className="animate-spin"
                />
              )}

              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGuruModal;