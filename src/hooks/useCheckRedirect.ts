import { useRefreshToken } from "@/routes/auth/queries";
import { useEffect } from "react";
import { useLocation } from "react-router";

export function useCheckRedirect() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.hash.substring(1));
  const refresh_token = queryParams.get("refresh_token");
  const { mutate, isPending } = useRefreshToken();

  useEffect(() => {
    if (refresh_token) {
      mutate({ refresh_token });
    }
  }, [mutate, refresh_token]);

  return { loading: isPending };
}
