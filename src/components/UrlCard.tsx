import { UrlDetailType } from "@/configs/schemas";
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
import { NavLink } from "react-router";
import { modals } from "@mantine/modals";
import { useDeleteUrl } from "@/routes/url/queries";

export function UrlCard({ url }: { url: UrlDetailType }) {
  const { isPending, mutate } = useDeleteUrl();

  const handleDelete = () =>
    modals.openConfirmModal({
      centered: true,
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          Are you sure you want to delete this url? This action cannot be
          undone.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => {
        mutate(url.id);
      },
      confirmProps: { color: "red" },
    });

  return (
    <Card shadow="sm" padding="xs" miw={300}>
      <Flex align="center" mt="md" justify="space-between">
        <Text fw={500} lineClamp={1} truncate="end">
          {window.location.origin}/{url.shortUrl}
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
        <Button
          component={NavLink}
          to={`/d/${url.id}`}
          size="xs"
          variant="outline"
        >
          Edit
        </Button>

        <Button
          loading={isPending}
          color="red"
          size="xs"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Flex>
    </Card>
  );
}
