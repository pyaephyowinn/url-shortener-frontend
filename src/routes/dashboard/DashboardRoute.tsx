import { Button, Flex, Stack, Title } from "@mantine/core";
import { useGetUrls } from "./queries";
import { UrlCard } from "@/components/UrlCard";

export function DashboardRoute() {
  const { data } = useGetUrls();
  console.log("data", data);

  return (
    <Stack p="lg" gap="lg">
      <Flex justify="space-between">
        <Title order={1} size="h3">
          Url Lists
        </Title>

        <Button>Add</Button>
      </Flex>

      <Flex>
        {data?.map((item) => (
          <UrlCard key={item.id} url={item} />
        ))}
      </Flex>
    </Stack>
  );
}
