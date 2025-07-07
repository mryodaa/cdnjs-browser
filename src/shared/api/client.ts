import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.cdnjs.com",
  timeout: 10_000,
});
