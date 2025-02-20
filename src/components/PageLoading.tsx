import { Center, Flex, Loader, Text } from "@mantine/core";

export function PageLoading({ label }: { label?: string }) {
  return (
    <Center h="100vh" w="100%">
      <Flex gap="md" align="center">
        <Loader color="blue" />
        {label && <Text>{label}</Text>}
      </Flex>
    </Center>
  );
}
