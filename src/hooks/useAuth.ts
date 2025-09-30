import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface RegisterData {
  clerkUserId: string;
  email: string;
  name: string;
  profile: string;
  createdAt: any;
}

interface RegisterResponse {
  success: boolean;
  data: {
    user_id: number;
    email: string;
    name: string;
    profile: string;
    role: string;
  };
  message: string;
}

const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await axios.post("http://localhost:3001/auth/register", data, {
    headers: { "Content-Type": "application/json" },
    validateStatus: () => true, // don't throw automatically on 4xx/5xx
  });

  if (response.status >= 400) {
    throw new Error(response.data?.message || "Something went wrong");
  }
  return response.data;
};

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterData>({
    mutationFn: registerUser,
    onMutate: () => {
      toast.loading("Registering user...");
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(data.message || "User registered successfully");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message || "Registration failed");
    },
  });
};
