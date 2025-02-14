import { createContext, useContext, useState } from "react";
import "../styles/component-styles.css";
import { RiErrorWarningLine } from "@remixicon/react";
import PropTypes from "prop-types";

const MAX_TOASTS = 3; // Limit the number of visible toasts
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    const newToast = { id: Date.now(), message };
    setToasts((prevToasts) => {
      if (prevToasts.length >= MAX_TOASTS) {
        return [...prevToasts.slice(1), newToast]; // Remove oldest toast if limit is reached
      }
      return [...prevToasts, newToast];
    });

    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => toast.id !== newToast.id)
      );
    }, 5000); // Remove toast after 5 seconds
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            <RiErrorWarningLine />
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useToast = () => useContext(ToastContext);
