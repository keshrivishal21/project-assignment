import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

API.interceptors.response.use(
  (res) => {
    if (res.data && Object.hasOwn(res.data, "data")) {
      res.data = res.data.data;
    }
    return res;
  },
  (err) => {
    if (err.response?.data?.error) {
      const apiError = err.response.data.error;
      err.response.data.message =
        typeof apiError === "string" ? apiError : apiError.message || "Something went wrong";
    }
    return Promise.reject(err);
  }
);

export default API;