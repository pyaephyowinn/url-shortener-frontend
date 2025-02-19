import { UrlType } from "@/types/url";
import {
  ActionIcon,
  Button,
  Card,
  CopyButton,
  Flex,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";

export function UrlCard({ url }: { url: UrlType }) {
  return (
    <Card shadow="sm" padding="xs">
      <Flex align="center" mt="md" justify="space-between">
        <Text fw={500} size="lg">
          {url.shortUrl}
        </Text>

        <CopyButton
          value={`${window.location.origin}/${url.shortUrl}`}
          timeout={2000}
        >
          {({ copied, copy }) => (
            <Tooltip
              label={copied ? "Copied" : "Copy"}
              withArrow
              position="right"
            >
              <ActionIcon
                color={copied ? "teal" : "gray"}
                variant="subtle"
                onClick={copy}
              >
                {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </Flex>

      <Text my="xs" c="dimmed" size="sm">
        {url.originalUrl}
      </Text>

      <Flex gap="xs" justify="end">
        <Button size="xs" variant="outline">
          Edit
        </Button>

        <Button color="red" size="xs">
          Delete
        </Button>
      </Flex>
    </Card>
  );
}
