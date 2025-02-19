import { refreshToken } from "@/services/auth";
import { useUserStore } from "@/store/useUser";
import axios, { AxiosResponse } from "axios";

let refreshTokenPromise: Promise<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AxiosResponse<any, unknown>
> | null = null;

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const access_token = useUserStore.getState().user?.access_token;
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      const refresh_token = useUserStore.getState().user?.refresh_token;
      if (!refresh_token) {
        useUserStore.getState().removeUser();
        return Promise.reject(error);
      }

      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshToken({ refresh_token });
      }

      return refreshTokenPromise.then((res) => {
        const { user, session } = res?.data?.data || {};
        useUserStore.getState().setUser({
          email: user?.email,
          access_token: session?.access_token,
          refresh_token: session?.refresh_token,
        });
        return apiClient(error.config);
      });
    }
    return Promise.reject(error);
  }
);
