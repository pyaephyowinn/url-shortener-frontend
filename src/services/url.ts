import { apiClient } from "@/configs/apiClient";
import { UrlDetailType, UrlType } from "@/configs/schemas";

export function getUrls() {
  return apiClient.get<{ data: UrlDetailType[] }>("/url");
}

export function checkShortUrl(shortUrl: string) {
  return apiClient.get<{ data: { found: boolean } }>("/url/check", {
    params: {
      shortUrl,
    },
  });
}

export function createUrl(data: UrlType) {
  return apiClient.post("/url/shorten", data);
}

export function getUrl(id: string) {
  return apiClient.get<{ data: UrlDetailType }>(`/url/${id}`);
}

export function updateUrl(id: string, data: UrlType) {
  return apiClient.patch(`/url/${id}`, data);
}

export function deleteUrl(id: string) {
  return apiClient.delete(`/url/${id}`);
}
