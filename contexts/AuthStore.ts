// src/contexts/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Role {
  authority: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  roles?: Role[];
  profileImage: string;
}

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  lastChecked: number;
  checkSession: (force?: boolean) => Promise<boolean>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: FormData) => Promise<void>;
  redirectToSocialLogin: (provider: "google" | "github") => void;
  getUserId: () => number | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/v1";
let _pendingCheckSession: Promise<boolean> | null = null;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      loading: false, // ← Inicialmente false
      user: null,
      lastChecked: 0,

      register: async (formData) => {
        try {
          const res = await fetch(`${API_URL}/auth/signup`, {
            method: "POST",
            credentials: "include",
            body: formData,
          });
          if (!res.ok) throw new Error("Falha ao registrar");
          await get().checkSession(true);
        } catch (err) {
          console.error("Registration error:", err);
          throw err;
        }
      },

      login: async (email, password) => {
        try {
          const res = await fetch(`${API_URL}/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
          });
          if (!res.ok) throw new Error("Falha no login");
          await get().checkSession(true);
        } catch (err) {
          console.error("Login error:", err);
          throw err;
        }
      },

      redirectToSocialLogin: (provider) => {
        if (typeof window !== "undefined") {
          window.location.href = `${API_URL}/oauth2/authorization/${provider}`;
        }
      },

      logout: async () => {
        try {
          await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
          });
        } catch (err) {
          console.error("Logout error:", err);
        } finally {
          const userId = get().user?.id;
          if (userId) localStorage.removeItem(`profileImage_${userId}`);
          set({
            isAuthenticated: false,
            user: null,
            loading: false, // ← Garante que loading seja false
            lastChecked: Date.now(),
          });
        }
      },

      checkSession: async (force = false) => {
        const cacheTTL = 60_000;
        const now = Date.now();
        const last = get().lastChecked;

        // Retorna se já está verificando
        if (_pendingCheckSession) return _pendingCheckSession;

        // Retorna cache se ainda é válido
        if (!force && now - last < cacheTTL) {
          return get().isAuthenticated;
        }

        _pendingCheckSession = (async () => {
          set({ loading: true }); // ← Inicia loading
          
          try {
            const res = await fetch(`${API_URL}/users/check-session`, {
              credentials: "include",
            });

            if (res.ok) {
              const { id, email, name, roles, profileImage } = await res.json();
              set({
                isAuthenticated: true,
                user: { id, email, name, roles, profileImage },
                loading: false, // ← Para loading com sucesso
                lastChecked: Date.now(),
              });
              return true;
            } else {
              set({
                isAuthenticated: false,
                user: null,
                loading: false, // ← Para loading com erro
                lastChecked: Date.now(),
              });
              return false;
            }
          } catch (err) {
            console.error("Erro ao verificar sessão:", err);
            set({
              isAuthenticated: false,
              user: null,
              loading: false, // ← Para loading com erro
              lastChecked: Date.now(),
            });
            return false;
          } finally {
            _pendingCheckSession = null;
          }
        })();

        return _pendingCheckSession;
      },

      getUserId: () => get().user?.id || null,
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        lastChecked: state.lastChecked,
      }),
      // Não persiste o estado loading!
    }
  )
);