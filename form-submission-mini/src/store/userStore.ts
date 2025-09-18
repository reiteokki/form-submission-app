import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  id: number | null;
  email: string | null;
  formFilled: boolean;
  accessToken: string | null;
  refreshToken: string | null;

  login: (payload: {
    id: number;
    email: string;
    formFilled: boolean;
    accessToken: string;
    refreshToken: string;
  }) => void;

  isFilled: (payload: { formFilled: boolean }) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      id: null,
      email: null,
      formFilled: false,
      accessToken: null,
      refreshToken: null,

      login: ({ id, email, formFilled, accessToken, refreshToken }) =>
        set({
          id,
          email,
          formFilled,
          accessToken,
          refreshToken,
        }),

      isFilled: ({ formFilled }) =>
        set({
          formFilled,
        }),

      logout: () =>
        set({
          id: null,
          email: null,
          formFilled: false,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useIsAuthenticated = () =>
  useAuthStore((s) => Boolean(s.accessToken));
