import { Stack, Text } from "@mantine/core";
import { UrlForm } from "./components/UrlForm";
import { useCreateUrl } from "./queries";
import { UrlType } from "@/configs/schemas";

export function NewUrlRoute() {
  const { isPending, mutate } = useCreateUrl();

  const handleSubmit = (values: UrlType) => {
    mutate(values);
  };

  return (
    <Stack p="lg" gap="lg" w="100%">
      <Text fw={500} size="xl">
        Create New Short Url
      </Text>

      <UrlForm
        loading={isPending}
        initialValues={{
          originalUrl: "",
          shortUrl: "",
        }}
        handleSubmit={handleSubmit}
      />
    </Stack>
  );
}
