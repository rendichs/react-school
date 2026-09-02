import React, { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  RefreshCw,
  User,
} from "lucide-react";

import TeacherFormModal from "./ModalCreate";
import EditGuruModal from "./ModalEdit";
import { api } from "@/services/api";
import Icon from "@/components/ui/Icon"; 
import StatusToast from "@/components/ui/StatusToast";
import { useToast } from "@/context/ToastContext";

const GuruPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const [saving, setSaving] = useState(false);

  const { showToast } = useToast();

  const handleToggleActive = async (teacher) => {
    const newStatus = !teacher.is_active;

    const confirmMessage = newStatus
      ? `Aktifkan akun ${teacher.nama_lengkap}?`
      : `Nonaktifkan akun ${teacher.nama_lengkap}?`;

    const confirmed = window.confirm(confirmMessage);

    if (!confirmed) {
      return;
    }

    try {
      const updatedTeacher = await api.patch(
        `/teachers/${teacher.id}/`,
        {
          is_active: newStatus,
        }
      );

      setTeachers((currentTeachers) =>
        currentTeachers.map((item) =>
          item.id === teacher.id
            ? updatedTeacher
            : item
        )
      );

      showToast({
        type: "success",
        title: newStatus
          ? "Guru Diaktifkan"
          : "Guru Dinonaktifkan",
        message: newStatus
          ? `Akun ${teacher.nama_lengkap} sekarang aktif.`
          : `Akun ${teacher.nama_lengkap} sekarang nonaktif.`,
      });
    } catch (error) {
      console.error(error);

      showToast({
        type: "error",
        title: "Gagal Mengubah Status",
        message:
          error?.message ||
          "Gagal mengubah status akun guru.",
      });
    }
  };

  const loadTeachers = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await api.get("/teachers/");
      setTeachers(
        Array.isArray(data)
            ? data
            : data.results || []
      );
    } catch (error) {
      console.error(error);

      setError(
        error.message || "Gagal mengambil data guru."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setShowEditModal(true);
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const filteredTeachers = teachers.filter((teacher) => {
    const keyword = search.toLowerCase();

    return (
      teacher.nama_lengkap
        ?.toLowerCase()
        .includes(keyword) ||
      teacher.username
        ?.toLowerCase()
        .includes(keyword) ||
      teacher.nip
        ?.toLowerCase()
        .includes(keyword)
    );
  });

  const handleUpdate = async (form) => {
    if (!selectedTeacher) return;

    setSaving(true);

    try {
      const payload = {
        username: form.username,
        email: form.email,
        nama_lengkap: form.nama_lengkap,
        nip: form.nip,
        jantina: form.jantina,
        no_telefon: form.no_telefon,
        alamat: form.alamat,
      };

      if (form.password?.trim()) {
        payload.password = form.password;
      }

      const updatedTeacher = await api.patch(
        `/teachers/${selectedTeacher.id}/`,
        payload
      );

      setTeachers((current) =>
        current.map((teacher) =>
          teacher.id === selectedTeacher.id
            ? updatedTeacher
            : teacher
        )
      );

      setShowEditModal(false);
      setSelectedTeacher(null);

      showToast({
        type: "success",
        title: "Guru Diperbarui",
        message: `Data ${form.nama_lengkap} berhasil diperbarui.`,
      });

    } catch (error) {
      console.error("Gagal memperbarui data guru:", error);

      showToast({
        type: "error",
        title: "Gagal Memperbarui Guru",
        message: `Gagal memperbarui data ${form.nama_lengkap}.`,
      });

    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (teacher) => {
    const confirmed = window.confirm(
      `Hapus akun ${teacher.nama_lengkap}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(
        `/teachers/${teacher.id}/`
      );

      setTeachers((current) =>
        current.filter(
          (item) => item.id !== teacher.id
        )
      );

    } catch (error) {
      console.error(error);

      showToast({
        type: "error",
        title: "Gagal Menghapus Guru",
        message: `Gagal menghapus guru ${teacher.nama_lengkap}.`,
      });
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Guru
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Kelola data dan akun guru madrasah.
          </p>
        </div>

        <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
            >
            <Plus size={18} />
            Tambah Guru
        </button>
      </div>

      {/* Toolbar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Cari nama, username, atau NIP..."
              className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
          </div>

          <button
            type="button"
            onClick={loadTeachers}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Guru
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  NIP
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Username
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    Memuat data guru...
                  </td>
                </tr>
              ) : filteredTeachers.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center"
                  >
                    <User
                      size={32}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 text-sm font-medium text-slate-600">
                      Belum ada data guru
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Data guru yang dibuat akan tampil di sini.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredTeachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className="transition hover:bg-slate-50 dark:hover:bg-slate-700/30"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800 dark:text-white">
                        {teacher.nama_lengkap || "-"}
                      </div>

                      <div className="mt-1 text-xs text-slate-400">
                        {teacher.email || "-"}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {teacher.nip || "-"}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {teacher.username}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(teacher)}
                        className="group inline-flex items-center gap-2"
                        title={
                          teacher.is_active
                            ? "Nonaktifkan akun"
                            : "Aktifkan akun"
                        }
                      >
                        <span
                          className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
                            teacher.is_active
                              ? "bg-green-500"
                              : "bg-slate-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                              teacher.is_active
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </span>

                        <span
                          className={`text-sm font-medium ${
                            teacher.is_active
                              ? "text-green-600"
                              : "text-slate-400"
                          }`}
                        >
                          {teacher.is_active
                            ? "Aktif"
                            : "Nonaktif"}
                        </span>
                      </button>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(teacher)}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-green-600"
                          title="Edit"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(teacher)}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                          title="Hapus"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TeacherFormModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={loadTeachers}
      />

      <EditGuruModal
        isOpen={showEditModal}
        teacher={selectedTeacher}
        onClose={() => {
          setShowEditModal(false);
          setSelectedTeacher(null);
        }}
        onSave={handleUpdate}
        loading={saving}
      />

    </div>
  );
};


export default GuruPage;