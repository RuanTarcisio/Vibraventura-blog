// src/contexts/useAuthStore.ts
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { toast } from "sonner"; // Para erros automáticos

interface Role { authority: string; }
interface User { id: number; name: string; profileImage: string; } // ← Sem email/roles no storage!

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  checkSession: () => Promise<boolean>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getUserId: () => number | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://api.vibraventura.com/v1";

export const useAuthStore = create<AuthState>()(
  persist(
    subscribeWithSelector( // ← Auto-debounce + reactivity
      (set, get) => ({
        isAuthenticated: false,
        loading: true, // ← ✅ Inicial true = zero flash!
        user: null,

        // src/contexts/useAuthStore.ts
        checkSession: async () => {
          const prevState = get();               // <-- guarda o estado anterior
          set({ loading: true });

          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8_000); // 8s timeout

            const res = await fetch(`${API_URL}/users/check-session`, {
              credentials: "include",
              signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (res.ok) {
              const { id, name, profileImage } = await res.json();
              set({
                isAuthenticated: true,
                user: { id, name, profileImage },
                loading: false,
              });
              return true;
            } else {
              // 401, 403, 500 → sessão inválida
              set({
                isAuthenticated: false,
                user: null,
                loading: false,
              });
              toast.error("Sessão expirada");
              return false;
            }
          } catch (err: any) {
            // ---- ERRO DE REDE (backend off, timeout, CORS) ----
            const isNetworkError =
              !navigator.onLine ||
              err.name === "TypeError" ||          // Failed to fetch
              err.name === "AbortError";           // timeout

            console.warn("checkSession – erro de rede:", err);

            // Não alteramos isAuthenticated se for só falha de rede
            set({
              loading: false,
              // mantemos o estado anterior (pode ser true ou false)
              ...prevState,
            });

            if (isNetworkError) {
              toast.error("Sem conexão com o servidor");
            } else {
              toast.error("Erro inesperado ao verificar sessão");
            }
            return false;
          }
        },

        login: async (email, password) => {
          const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
          });

          if (!res.ok) {
            toast.error("Credenciais inválidas"); // ← Backend 401!
            throw new Error("Falha no login");
          }

          await get().checkSession(); // ✅ Auto-atualiza store
        },

        logout: async () => {
          try {
            await fetch(`${API_URL}/auth/logout`, { 
              method: "POST", 
              credentials: "include" 
            });
          } finally {
            const userId = get().user?.id;
            if (userId) localStorage.removeItem(`profileImage_${userId}`);
            set({ isAuthenticated: false, user: null, loading: false });
          }
        },

        getUserId: () => get().user?.id || null,
      })
    ),
    {
      name: "auth-storage",
      partialize: (state) => ({ // ← ✅ Sem dados sensíveis!
        isAuthenticated: state.isAuthenticated,
        user: state.user ? { 
          id: state.user.id, 
          name: state.user.name, 
          profileImage: state.user.profileImage 
        } : null,
      }),
    }
  )
);