import axios from "axios";
import toast from "react-hot-toast";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const errorMessages: Record<number, string> = {
  401: "Unauthorized. Please sign in again.",
  403: "Forbidden. You do not have permission to access this resource.",
  404: "Resource not found (404)",
  422: "Unprocessable entity. Please check your input.",
  500: "Internal Server Error. Please try again later.",
  502: "Bad Gateway. Please try again later.",
  503: "Service Unavailable. Please try again later.",
  504: "Gateway Timeout. Please try again later.",
};

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status) {
      const message =
        errorMessages[status] ||
        (status >= 500
          ? "Server error. Please try again later."
          : error.response?.data?.message || "Unexpected error occurred");

      toast.error(message);

      if (status === 401) {
        window.location.href = "/register-user";
      }
    } else {
      toast.error("Network error. Please check your connection.");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
