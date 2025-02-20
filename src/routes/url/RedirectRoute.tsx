import { useParams } from "react-router";
import { useGetCheckShortUrl } from "./queries";
import { PageLoading } from "@/components/PageLoading";
import { NothingFoundBackground } from "@/components/NothingFoundBackground";
import { useEffect } from "react";

export function RedirectRoute() {
  const { shortUrl } = useParams();
  const { data, isPending } = useGetCheckShortUrl(shortUrl as string);

  useEffect(() => {
    if (data?.found) {
      window.location.replace(data.originalUrl);
    }
  }, [data?.found, data?.originalUrl]);

  if (isPending) {
    return <PageLoading label="Checking short url ..." />;
  }

  if (!isPending && !data?.found) {
    return <NothingFoundBackground />;
  }

  return null;
}
