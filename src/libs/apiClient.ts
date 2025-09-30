import axios from "axios";
import toast from "react-hot-toast";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      toast.error("Unauthorized. Please sign in again.");
      window.location.href = "/auth";
    } else if (status === 404) {
      toast.error("Resource not found (404)");
    } else if (status >= 500) {
      toast.error("Server error. Please try again later.");
    } else {
      toast.error(error.response?.data?.message || "Unexpected error occurred");
    }

    return Promise.reject(error);
  }
);

export default apiClient;