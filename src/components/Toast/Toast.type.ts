import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

export type ToastMessage = {
    id: number;
    title: string;
    description: string;
    color?: string;
    backgroundColor?: string;
    icon?: React.ReactNode;
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  };
  
  export type ToastContextType = {
    addToast: (toast: Omit<ToastMessage, "id"> & { type?: "info" | "error" | "success" }) => void;
    removeToast: (id: number) => void;
    toasts: ToastMessage[];
  };

  export const toastStyles = {
    error: {
      icon: FaExclamationTriangle,
      backgroundColor: "#f8d7da",
      color: "#721c24",
    },
    success: {
      icon: FaCheckCircle,
      backgroundColor: "#dff0d8",
      color: "#3c763d",
    },
    info: {
      icon: FaInfoCircle,
      backgroundColor: "#d9edf7",
      color: "#31708f",
    },
    default: {
      icon: FaInfoCircle,
      backgroundColor: "#cce5ff",
      color: "#004085",
    },
  };