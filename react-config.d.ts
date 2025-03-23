// Vite config dosyası
const Config = {
  ENV: import.meta.env.VITE_ENV,
  LOGGER: import.meta.env.VITE_LOGGER,
  BASE_URL: import.meta.env.VITE_BASE_URL,
};

export default Config;
