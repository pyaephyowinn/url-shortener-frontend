import { Center, Loader } from "@mantine/core";

export function PageLoading() {
  return (
    <Center h="100vh" w="100%">
      <Loader color="blue" />
    </Center>
  );
}
