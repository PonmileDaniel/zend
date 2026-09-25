const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8081/api/auth";

const API_URL_DASHBOARD =
  import.meta.env.VITE_API_URL_DASHBOARD ??
  "http://localhost:8081/api/dashboard";

const API_URL_TRANSFER = import.meta.env.VITE_API_URL_TRANSFER ?? "http://localhost:8081/api/transfer";

export { API_URL, API_URL_DASHBOARD, API_URL_TRANSFER };