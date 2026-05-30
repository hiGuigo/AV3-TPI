// com o axios é possível realizar as requisições HTTP necessárias
import axios from "axios";

// baseURL é definida em uma instância personalizada para evitar repetições de código
// sem ela fica algo como: axios.post("http://localhost:3000/rota", data)
export const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);
