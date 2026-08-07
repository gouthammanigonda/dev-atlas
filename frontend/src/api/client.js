import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default client;