import React, { useState } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";

import Modal from "@/components/ui/Modal";
import { api } from "@/services/api";

const initialForm = {
  username: "",
  email: "",
  password: "",
  nama_lengkap: "",
  nip: "",
  jantina: "",
  no_telefon: "",
  alamat: "",
};

const TeacherFormModal = ({ isOpen, onClose, onSuccess }) => {
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!form.username.trim()) {
      setError("Username wajib diisi.");
      return;
    }

    if (!form.email.trim()) {
      setError("Email wajib diisi.");
      return;
    }

    if (!form.password) {
      setError("Password wajib diisi.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }

    if (!form.nama_lengkap.trim()) {
      setError("Nama lengkap wajib diisi.");
      return;
    }

    if (!form.nip.trim()) {
      setError("NIP wajib diisi.");
      return;
    }

    if (!form.jantina) {
      setError("Jenis kelamin wajib dipilih.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/teachers/", {
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        nama_lengkap: form.nama_lengkap.trim(),
        nip: form.nip.trim(),
        jantina: form.jantina,
        no_telefon: form.no_telefon.trim(),
        alamat: form.alamat.trim(),
      });

      setForm(initialForm);
      setShowPassword(false);

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Gagal membuat guru:", error);

      const data = error.data;

      if (data && typeof data === "object") {
        const firstFieldError = Object.values(data)
          .flat()
          .find(Boolean);

        if (firstFieldError) {
          setError(firstFieldError);
        } else {
          setError(
            error.message || "Gagal membuat akun guru."
          );
        }
      } else {
        setError(
          error.message || "Gagal membuat akun guru."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) {
      return;
    }

    setForm(initialForm);
    setError("");
    setShowPassword(false);

    onClose();
  };

  const footerContent = (
    <>
      <button
        type="button"
        onClick={handleClose}
        disabled={loading}
        className="btn btn-light"
      >
        Batal
      </button>

      <button
        type="submit"
        form="create-teacher-form"
        disabled={loading}
        className="btn btn-success"
      >
        {loading ? "Menyimpan..." : "Simpan Guru"}
      </button>
    </>
  );

  return (
    <Modal
      activeModal={isOpen}
      onClose={handleClose}
      enterFrom="scale-90 translate-y-5"
      leaveFrom="scale-100 translate-y-0"
      className="max-w-2xl"
      title="Tambah Guru"
      footerContent={footerContent}
    >
      <form
        id="create-teacher-form"
        onSubmit={handleSubmit}
      >
        <div className="space-y-6">

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Informasi Akun */}
          <section>
            <div className="mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200">
                Informasi Akun
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Data ini digunakan guru untuk login ke MORA.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">

              <FormInput
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="contoh: ahmad.fauzi"
                required
              />

              <FormInput
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="guru@madrasah.sch.id"
                required
              />

              {/* Password */}
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Password
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Minimal 8 karakter"
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((value) => !value)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Data Guru */}
          <section>
            <div className="mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200">
                Data Guru
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Informasi profil guru.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">

              <FormInput
                label="Nama Lengkap"
                name="nama_lengkap"
                value={form.nama_lengkap}
                onChange={handleChange}
                placeholder="Nama lengkap guru"
                required
              />

              <FormInput
                label="NIP"
                name="nip"
                value={form.nip}
                onChange={handleChange}
                placeholder="Nomor Induk Pegawai"
                required
              />

              {/* Jenis Kelamin */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Jenis Kelamin
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <select
                  name="jantina"
                  value={form.jantina}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                  required
                >
                  <option value="">
                    Pilih jenis kelamin
                  </option>

                  <option value="Lelaki">
                    Lelaki
                  </option>

                  <option value="Perempuan">
                    Perempuan
                  </option>
                </select>
              </div>

              <FormInput
                label="No. Telepon"
                name="no_telefon"
                value={form.no_telefon}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
              />

              {/* Alamat */}
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Alamat
                </label>

                <textarea
                  name="alamat"
                  value={form.alamat}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Alamat lengkap guru"
                  className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                />
              </div>

            </div>
          </section>

        </div>
      </form>
    </Modal>
  );
};

const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}) => {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
      />
    </div>
  );
};

export default TeacherFormModal;