import { urlKeys } from "@/configs/query-keys";
import { getUrls } from "@/services/url";
import { useQuery } from "@tanstack/react-query";

export function useGetUrls() {
  return useQuery({
    queryKey: urlKeys.lists(),
    queryFn: getUrls,
    select: (data) => data.data?.data,
  });
}
