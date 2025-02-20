import { LoginType, RegisterType } from "@/configs/schemas";
import { login, refreshToken, register } from "@/services/auth";
import { useUserStore } from "@/store/useUser";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useLogin() {
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: LoginType) => login(data),
    onSuccess: (res) => {
      const { user, session } = res?.data?.data || {};
      showNotification({
        title: "Login Success!",
        message: "You have successfully logged.",
      });
      setUser({
        email: user?.email,
        access_token: session?.access_token,
        refresh_token: session?.refresh_token,
      });
      navigate("/d");
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterType) => register(data),
    onSuccess: (res) => {
      showNotification({
        title: "Success!",
        message:
          res?.data?.message ||
          "User registered successfully. Please check your email for verification!",
      });
    },
  });
}

export function useRefreshToken() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  return useMutation({
    mutationFn: (data: { refresh_token: string }) => refreshToken(data),
    onSuccess: (res) => {
      const { user, session } = res?.data?.data || {};
      setUser({
        email: user?.email,
        access_token: session?.access_token,
        refresh_token: session?.refresh_token,
      });
      showNotification({
        title: "Success!",
        message: "You have successfully logged in.",
      });
      navigate("/d");
    },
  });
}
