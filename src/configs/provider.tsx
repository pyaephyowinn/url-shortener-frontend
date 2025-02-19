import { createTheme, MantineProvider } from "@mantine/core";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Notifications, showNotification } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

const theme = createTheme({
  components: {
    Container: {
      defaultProps: {
        size: "lg",
      },
    },
  },
});

export function Provider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          console.log("response?.data?.data", error?.response?.data?.message);
          const errMessage =
            error?.response?.data?.message || "Something went wrong";
          showNotification({
            title: "Error",
            color: "red",
            message: errMessage,
          });
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <Notifications position="top-right" />
          {children}
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
