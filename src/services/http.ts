// src/services/http.ts
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export async function http<T = any>(
path: string,
init: RequestInit = {},
token?: string
): Promise<T> {
// Poprawne typowanie headers
const headers: Record<string, string> = { 
  "Content-Type": "application/json",
  ...(init.headers as Record<string, string> || {})
};

if (token) {
  headers["Authorization"] = `Bearer ${token}`;
}

const res = await fetch(`${API_URL}${path}`, {
  ...init,
  headers,
});

if (!res.ok) {
  const errorData = await res.json().catch(() => ({ message: 'Network error' }));
  throw new Error(errorData.message || `HTTP ${res.status}: ${res.statusText}`);
}

// Sprawdź czy odpowiedź ma content
const contentType = res.headers.get('content-type');
if (contentType && contentType.includes('application/json')) {
  return res.json();
}

return res.text() as unknown as T;
}

// Pomocnicze funkcje dla różnych metod HTTP
export const httpGet = <T = any>(path: string, token?: string): Promise<T> =>
http<T>(path, { method: 'GET' }, token);

export const httpPost = <T = any>(path: string, data: any, token?: string): Promise<T> =>
http<T>(path, { 
  method: 'POST', 
  body: JSON.stringify(data) 
}, token);

export const httpPut = <T = any>(path: string, data: any, token?: string): Promise<T> =>
http<T>(path, { 
  method: 'PUT', 
  body: JSON.stringify(data) 
}, token);

export const httpDelete = <T = any>(path: string, token?: string): Promise<T> =>
http<T>(path, { method: 'DELETE' }, token);

// Interceptor dla automatycznego dodawania tokenu
export const createAuthenticatedHttp = (getToken: () => string | null) => {
return {
  get: <T = any>(path: string): Promise<T> => 
    httpGet<T>(path, getToken() || undefined),
  post: <T = any>(path: string, data: any): Promise<T> => 
    httpPost<T>(path, data, getToken() || undefined),
  put: <T = any>(path: string, data: any): Promise<T> => 
    httpPut<T>(path, data, getToken() || undefined),
  delete: <T = any>(path: string): Promise<T> => 
    httpDelete<T>(path, getToken() || undefined),
};
};