// src/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.vibraventura.com.br/api';

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  retries = 1
): Promise<T> {
  for (let i = 0; i <= retries; i++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const res = await fetch(`${API_URL}${path}`, {
        ...options,
        credentials: 'include',
        signal: controller.signal,
        cache: 'force-cache',
        next: { revalidate: 60 },
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText || 'Erro desconhecido'}`);
      }

      return (await res.json()) as T;
    } catch (error: any) {
      clearTimeout(timeoutId);

      // Última tentativa
      if (i === retries) {
        console.error(`[apiFetch] Falha após ${retries + 1} tentativas:`, error);
        throw error;
      }

      // Backoff exponencial
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }

  throw new Error('Falha inesperada na apiFetch');
}

// === MÉTODOS AUXILIARES (opcional) ===
export const api = {
  get: <T>(path: string, retries?: number) =>
    apiFetch<T>(path, {}, retries),

  post: <T>(path: string, body: any, retries?: number) =>
    apiFetch<T>(
      path,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
      retries
    ),

  put: <T>(path: string, body: any, retries?: number) =>
    apiFetch<T>(
      path,
      {
        method: 'PUT',
        body: JSON.stringify(body),
      },
      retries
    ),

  delete: <T>(path: string, retries?: number) =>
    apiFetch<T>(path, { method: 'DELETE' }, retries),
};