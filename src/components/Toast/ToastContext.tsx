import React, { createContext, useContext, useState, ReactNode } from "react";
import { ToastContextType, ToastMessage, toastStyles } from "./Toast.type";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, "id"> & { type?: "info" | "error" | "success" }) => {
    const id = Date.now();
    const { icon: Icon, backgroundColor, color } = toastStyles[toast.type || "default"];

    setToasts((prev) => [
      ...prev,
      { id, Icon, backgroundColor, color, position: "top-left", ...toast },
    ]);

    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev?.filter((toast) => toast?.id !== id));
  };

  return <ToastContext.Provider value={{ addToast, removeToast, toasts }}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
