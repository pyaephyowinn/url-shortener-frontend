import { apiClient } from "@/configs/apiClient";
import { UrlType } from "@/types/url";

export function getUrls() {
  return apiClient.get<{ data: UrlType[] }>("/url");
}
