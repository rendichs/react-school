import React, { useEffect } from "react";
import Icon from "@/components/ui/Icon";
import { useToast } from "@/context/ToastContext";

const StatusToast = () => {
  const { toast, hideToast } = useToast();

  useEffect(() => {
    if (!toast.show) return;

    const timer = setTimeout(() => {
      hideToast();
    }, 3500);

    return () => clearTimeout(timer);
  }, [toast.show, hideToast]);

  if (!toast.show) {
    return null;
  }

  const isSuccess = toast.type === "success";

  return (
    <div className="fixed right-5 top-5 z-[9999] w-[360px] max-w-[calc(100vw-40px)]">
      <div className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-800">

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
            isSuccess
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          <Icon
            icon={isSuccess ? "ph:check" : "ph:x"}
            width="20"
            height="20"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-slate-800 dark:text-white">
            {toast.title}
          </h4>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {toast.message}
          </p>
        </div>

        <button
          type="button"
          onClick={hideToast}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700"
        >
          <Icon
            icon="ph:x"
            width="16"
            height="16"
          />
        </button>

      </div>
    </div>
  );
};

export default StatusToast;