
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");
  
  const headers: Record<string, string> = {
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  };

  // Only add Content-Type: application/json if body is NOT FormData
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json();
};
