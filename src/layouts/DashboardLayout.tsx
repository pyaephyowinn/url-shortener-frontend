import { Navbar } from "@/components/Navbar";
import { useUserStore } from "@/store/useUser";
import { Flex } from "@mantine/core";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export function DashboardLayout() {
  const navigate = useNavigate();
  const token = useUserStore((state) => state?.user?.access_token);

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [navigate, token]);

  return (
    <Flex>
      <Navbar />
      <Outlet />
    </Flex>
  );
}
