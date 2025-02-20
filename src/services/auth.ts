import { apiClient } from "@/configs/apiClient";
import { LoginType, RegisterType } from "@/configs/schemas";

export function login(data: LoginType) {
  return apiClient.post("/auth/login", data);
}

export function refreshToken(data: { refresh_token: string }) {
  return apiClient.post("/auth/refresh-token", data);
}

export function register(data: RegisterType) {
  return apiClient.post("/auth/register", data);
}
