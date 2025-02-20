import { useParams } from "react-router";
import { useGetCheckShortUrl } from "./queries";
import { PageLoading } from "@/components/PageLoading";
import { NothingFoundBackground } from "@/components/NothingFoundBackground";

export function RedirectRoute() {
  const { shortUrl } = useParams();
  const { data, isPending } = useGetCheckShortUrl(shortUrl as string);

  if (isPending) {
    return <PageLoading label="Checking short url ..." />;
  }

  if (data?.found) {
    window.location.href = data.originalUrl;
  }

  return <NothingFoundBackground />;
}
