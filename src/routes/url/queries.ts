import { urlKeys } from "@/configs/query-keys";
import { UrlType } from "@/configs/schemas";
import { checkShortUrl, createUrl, deleteUrl, getUrl } from "@/services/url";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useCheckShortUrl() {
  return useMutation({
    mutationFn: (shortUrl: string) => checkShortUrl(shortUrl),
  });
}

export function useCreateUrl() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: UrlType) => createUrl(data),
    onSuccess: (res) => {
      showNotification({
        title: "Success!",
        message: res.data.message,
      });
      navigate("/d", { replace: true });
    },
  });
}

export function useGetUrlDetails(id: string) {
  return useQuery({
    queryFn: () => getUrl(id),
    queryKey: [urlKeys.detail(id)],
    select: (data) => data.data?.data,
    enabled: !!id,
  });
}

export function useUpdateUrl() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: UrlType) => createUrl(data),
    onSuccess: (res) => {
      showNotification({
        title: "Success!",
        message: res.data.message,
      });
      navigate("/d", { replace: true });
    },
  });
}

export function useDeleteUrl() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUrl(id),
    onSuccess: () => {
      showNotification({
        title: "Success!",
        message: "Url deleted successfully.",
      });
      queryClient.invalidateQueries({
        queryKey: urlKeys.lists(),
      });
    },
  });
}
