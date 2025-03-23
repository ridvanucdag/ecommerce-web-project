import React from "react";
import { useToast } from "./ToastContext";
import Toast from "./Toast";
import { ToastMessage } from "./Toast.type";
import "./Toast.css";

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  const getPositionClass = (position: ToastMessage["position"]) => {
    switch (position) {
      case "top-left":
        return "top-left";
      case "bottom-left":
        return "bottom-left";
      case "bottom-right":
        return "bottom-right";
      default:
        return "top-right";
    }
  };

  return (
    <>
      {["top-left", "top-right", "bottom-left", "bottom-right"]?.map((position) => (
        <div
          key={position}
          className={`toast-container ${getPositionClass(position as ToastMessage["position"])}`}
        >
          {toasts
            ?.filter((toast) => toast?.position === position || (!toast?.position && position === "top-right"))
            ?.map((toast) => (
              <Toast key={toast?.id} toast={toast} onClose={() => removeToast(toast?.id)} />
            ))}
        </div>
      ))}
    </>
  );
};

export default ToastContainer;
