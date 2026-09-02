import React from "react";
import Icon from "@/components/ui/Icon";

const ModalDelete = ({
  isOpen,
  teacher,
  onClose,
  onConfirm,
  loading = false,
}) => {
  if (!isOpen || !teacher) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl dark:bg-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            Hapus Guru
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-700"
          >
            <Icon
              icon="ph:x"
              width="20"
              height="20"
            />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Icon
                icon="ph:trash"
                width="22"
                height="22"
              />
            </div>

            <div>
              <h3 className="text-base font-semibold text-slate-800 dark:text-white">
                Hapus akun guru?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Anda yakin ingin menghapus akun{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {teacher.nama_lengkap}
                </span>
                ?
              </p>

              <p className="mt-2 text-xs leading-5 text-red-500">
                Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-700/30">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && (
              <Icon
                icon="ph:spinner"
                width="18"
                height="18"
                className="animate-spin"
              />
            )}

            {loading ? "Menghapus..." : "Hapus Guru"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;