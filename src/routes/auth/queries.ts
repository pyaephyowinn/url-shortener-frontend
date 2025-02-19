import { LoginType } from "@/configs/schemas";
import { login } from "@/services/auth";
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
        message: "You have successfully logged in.",
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
