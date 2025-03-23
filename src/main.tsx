import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import en from "./locales/en/en.json";
import tr from "./locales/tr/tr.json";
import ReactContextProvider from "./requests/base/ReactContextProvider.tsx";
import { ToastProvider } from "./components/Toast/ToastContext.tsx";
import ToastContainer from "./components/Toast/ToastContainer.tsx";

i18next.use(initReactI18next).init({
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    tr: { translation: tr },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18next} key={i18next.language}>
      <ReactContextProvider>
        <ToastProvider>
          <ToastContainer />
          <App />
        </ToastProvider>
      </ReactContextProvider>
    </I18nextProvider>
  </StrictMode>
);
