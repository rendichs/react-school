import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    show: false,
    type: "success",
    title: "",
    message: "",
  });

  const showToast = useCallback(
    ({
      type = "success",
      title = "Berhasil",
      message = "",
    }) => {
      setToast({
        show: true,
        type,
        title,
        message,
      });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast((current) => ({
      ...current,
      show: false,
    }));
  }, []);

  const value = useMemo(
    () => ({
      toast,
      showToast,
      hideToast,
    }),
    [toast, showToast, hideToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast harus digunakan di dalam ToastProvider."
    );
  }

  return context;
};