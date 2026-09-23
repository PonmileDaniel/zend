const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8081/api/auth";

const API_URL_DASHBOARD =
  import.meta.env.VITE_API_URL_DASHBOARD ??
  "http://localhost:8081/api/dashboard";

export { API_URL, API_URL_DASHBOARD };