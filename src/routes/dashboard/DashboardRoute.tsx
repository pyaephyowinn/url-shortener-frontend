import { Box, Button, Flex, Stack, Text, Title } from "@mantine/core";
import { useGetUrls } from "./queries";
import { UrlCard } from "@/components/UrlCard";
import { NavLink } from "react-router";
import { IconPlus } from "@tabler/icons-react";
import { PageLoading } from "@/components/PageLoading";

export function DashboardRoute() {
  const { data, isPending } = useGetUrls();

  if (isPending) {
    return <PageLoading />;
  }

  return (
    <Stack p="lg" gap="lg" w="100%">
      <Flex justify="space-between" w="100%">
        <Title order={1} size="h3">
          Url Lists
        </Title>

        <Button component={NavLink} to="/d/new" variant="filled">
          <IconPlus size={16} />
          <Text ml="xs">Create</Text>
        </Button>
      </Flex>

      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {data?.map((item) => (
          <UrlCard key={item.id} url={item} />
        ))}
      </Box>
    </Stack>
  );
}
