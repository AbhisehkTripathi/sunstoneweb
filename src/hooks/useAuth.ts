import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authService, LoginPayload, RegisterPayload } from "@/services/authService";

interface LoginResponse {
  success: boolean;
  data: {
    user_id: number;
    email: string;
    name: string;
    profile: string;
    role: string;
    token?: string;
  };
  message: string;
}

interface RegisterResponse {
  success: boolean;
  data: {
    user_id: number;
    email: string;
    name: string;
    profile?: string;
    role: string;
    token?: string;
  };
  message: string;
}

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: authService.login,
    onMutate: () => {
      toast.loading("Logging in...");
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(data.message || "Login successful");

      if (data.data.token) {
        localStorage.setItem("authToken", data.data.token);
      }
      localStorage.setItem("user", JSON.stringify(data.data));
    },
    onError: (error:any) => {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
};

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: authService.register,
    onMutate: () => {
      toast.loading("Creating account...");
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(data.message || "Account created successfully");

      if (data.data.token) {
        localStorage.setItem("authToken", data.data.token);
      }
      localStorage.setItem("user", JSON.stringify(data.data));
    },
    onError: (error:any) => {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};
