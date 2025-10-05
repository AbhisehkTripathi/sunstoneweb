// store/authStore.ts
import { create } from "zustand";
import { persist,createJSONStorage } from "zustand/middleware";

type User = {
  id: string;
  name: string;
  email: string;
  profile?: string;
  role?: string;
  created_at: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  created_at: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string | null) => void;
  clearAuth: () => void;

  // login-specific
  setAuthLogin: (user: any, token: string | null) => void;
  clearAuthLogin: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      created_at: null,
      isAuthenticated: false,

      setAuth: (user, token) =>
        set({
          user,
          token,
          created_at: user.created_at,
          isAuthenticated: true,
        }),

      clearAuth: () =>
        set({
          user: null,
          token: null,
          created_at: null,
          isAuthenticated: false,
        }),

      setAuthLogin: (user, token) =>
        set({
          user,
          token,
          created_at: user.created_at,
          isAuthenticated: true,
        }),

      clearAuthLogin: () =>
        set({
          user: null,
          token: null,
          created_at: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
