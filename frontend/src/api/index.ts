import axios from "axios";

const api = axios.create({
  baseURL: "https://tpeng2-backend.onrender.com",
});

api.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token") as string;
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
