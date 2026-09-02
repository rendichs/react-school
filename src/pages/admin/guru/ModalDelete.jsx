import React, { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";

const ModalDelete = ({
  isOpen,
  teacher,
  onClose,
  onConfirm,
  loading = false,
}) => {
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setError("");
    }
  }, [isOpen, teacher]);

  if (!isOpen || !teacher) {
    return null;
  }

  const handleClose = () => {
    if (loading) {
      return;
    }

    setError("");
    onClose();
  };

  const handleConfirm = async () => {
    if (loading) {
      return;
    }

    setError("");

    try {
      await onConfirm();
    } catch (error) {
      console.error(
        "Gagal menghapus guru:",
        error
      );

      const message =
        error?.data?.detail ||
        error?.message ||
        "Guru tidak dapat dihapus.";

      setError(message);
    }
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
        type="button"
        onClick={handleConfirm}
        disabled={loading}
        className="btn btn-danger inline-flex items-center gap-2"
      >
        {loading && (
          <Icon
            icon="ph:spinner"
            width="18"
            height="18"
            className="animate-spin"
          />
        )}

        {loading
          ? "Menghapus..."
          : "Hapus Guru"}
      </button>
    </>
  );

  return (
    <Modal
      activeModal={isOpen}
      onClose={handleClose}
      enterFrom="scale-90 translate-y-5"
      leaveFrom="scale-100 translate-y-0"
      className="max-w-md"
      title="Hapus Guru"
      footerContent={footerContent}
    >
      <div className="py-2">

        {/* Icon */}
        <div className="mb-5 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
            <Icon
              icon="ph:trash"
              width="26"
              height="26"
            />
          </div>
        </div>

        {/* Message */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            Hapus akun guru?
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
            Anda yakin ingin menghapus akun guru{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {teacher.nama_lengkap}
            </span>
            ?
          </p>

          {/* Firewall Error */}
          {error && (
            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-left dark:border-red-900/40 dark:bg-red-900/20">
              <div className="flex items-start gap-3">

                <Icon
                  icon="ph:warning-circle"
                  width="20"
                  height="20"
                  className="mt-0.5 shrink-0 text-red-500"
                />

                <div>
                  <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                    Guru tidak dapat dihapus
                  </p>

                  <p className="mt-1 text-sm leading-5 text-red-600 dark:text-red-400">
                    {error}
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* Warning normal */}
          {!error && (
            <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
              <div className="flex items-center justify-center gap-2">
                <Icon
                  icon="ph:warning"
                  width="18"
                  height="18"
                />

                <span>
                  Tindakan ini tidak dapat dibatalkan.
                </span>
              </div>
            </div>
          )}
        </div>

      </div>
    </Modal>
  );
};

export default ModalDelete;