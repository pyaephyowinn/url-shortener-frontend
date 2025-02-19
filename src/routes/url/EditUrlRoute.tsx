import { Stack, Text } from "@mantine/core";
import { UrlForm } from "./components/UrlForm";
import { useGetUrlDetails, useUpdateUrl } from "./queries";
import { UrlType } from "@/configs/schemas";
import { useParams } from "react-router";
import { PageLoading } from "@/components/PageLoading";

export function EditUrlRoute() {
  const { id } = useParams<{ id: string }>();
  const { data, isPending } = useGetUrlDetails(id as string);
  const updateMutation = useUpdateUrl();

  const handleSubmit = (values: UrlType) => {
    updateMutation.mutate(values);
  };

  if (isPending) {
    return <PageLoading />;
  }

  return (
    <Stack p="lg" gap="lg" w="100%">
      <Text fw={500} size="xl">
        Edit Short Url
      </Text>

      <UrlForm
        loading={updateMutation.isPending}
        initialValues={{
          originalUrl: data?.originalUrl || "",
          shortUrl: data?.shortUrl || "",
        }}
        handleSubmit={handleSubmit}
      />
    </Stack>
  );
}
