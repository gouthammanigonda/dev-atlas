import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 10000,
});

export default client;