import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import Modal from "@/components/ui/Modal";

const EditGuruModal = ({
  isOpen,
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

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!teacher) {
      return;
    }

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

    setShowPassword(false);
  }, [teacher]);

  if (!isOpen || !teacher) {
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

  const handleClose = () => {
    if (loading) {
      return;
    }

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
        form="edit-teacher-form"
        disabled={loading}
        className="btn btn-success"
      >
        {loading ? "Menyimpan..." : "Simpan Perubahan"}
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
      title="Edit Guru"
      footerContent={footerContent}
    >
      <form
        id="edit-teacher-form"
        onSubmit={handleSubmit}
      >
        <div className="space-y-5">

          {/* Informasi Akun */}
          <section>
            <div className="mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200">
                Informasi Akun
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Perbarui informasi akun guru.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">

              {/* Username */}
              <FormInput
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />

              {/* Email */}
              <FormInput
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />

            </div>
          </section>

          {/* Data Guru */}
          <section>
            <div className="mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200">
                Data Guru
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Perbarui informasi profil guru.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">

              {/* Nama */}
              <FormInput
                label="Nama Lengkap"
                name="nama_lengkap"
                value={form.nama_lengkap}
                onChange={handleChange}
                required
              />

              {/* NIP */}
              <FormInput
                label="NIP"
                name="nip"
                value={form.nip}
                onChange={handleChange}
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
                  required
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
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

              {/* Telepon */}
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

          {/* Password */}
          <section>
            <div className="mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200">
                Password
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Kosongkan jika password tidak ingin diubah.
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Password Baru
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  minLength={8}
                  placeholder="Minimal 8 karakter"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
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

              <p className="mt-1.5 text-xs text-slate-400">
                Minimal 8 karakter. Kosongkan jika tidak ingin mengubah password.
              </p>
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

export default EditGuruModal;