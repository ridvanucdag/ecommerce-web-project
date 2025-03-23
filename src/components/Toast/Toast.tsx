import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastMessage } from "./Toast.type";
import "./Toast.css";

const toastVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
};

const Toast: React.FC<{ toast: ToastMessage; onClose: () => void }> = ({ toast, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={toastVariants}
        transition={{ duration: 0.3 }}
        className="toast"
        style={{
          backgroundColor: toast.backgroundColor || "#333",
          color: toast.color || "#fff",
        }}
        onClick={onClose}
      >
        {toast.icon && <span className="toast-icon">{toast?.icon}</span>}
        <div className="toast-content">
          <strong className="toast-title">{toast?.title}</strong>
          <p className="toast-description">{toast?.description}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
