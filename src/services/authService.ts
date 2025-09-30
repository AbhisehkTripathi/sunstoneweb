import apiClient from "@/libs/apiClient";

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = { name: string; email: string; password: string };

export const authService = {
  login: async (payload: LoginPayload) => {
    const { data } = await apiClient.post("/auth/login", payload);
    return data;
  },
  register: async (payload: RegisterPayload) => {
    const { data } = await apiClient.post("/auth/register", payload);
    return data;
  },
};
