import axios from "axios";
import { store } from "../../store/index";

const api = axios.create({
  baseURL: "http://10.236.148.30:8080/api",
   /*  baseURL: "http://localhost:8088/api", */
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.LogIn.isLoged.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
