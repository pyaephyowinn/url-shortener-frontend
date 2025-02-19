import { urlSchema, UrlType } from "@/configs/schemas";
import { Box, Button, Flex, Stack, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDebouncedCallback } from "@mantine/hooks";
import { useCheckShortUrl } from "../queries";
import { NavLink } from "react-router";

type URLFormPropsType = {
  loading: boolean;
  initialValues: UrlType;
  handleSubmit: (values: UrlType) => void;
};

export function UrlForm({
  loading,
  initialValues,
  handleSubmit,
}: URLFormPropsType) {
  const { isPending, mutate } = useCheckShortUrl();

  const { getInputProps, onSubmit, watch, setFieldError, getValues } =
    useForm<UrlType>({
      mode: "uncontrolled",
      initialValues,
      validate: zodResolver(urlSchema),
    });

  const debouncedCheckUrl = useDebouncedCallback((shortUrl: string) => {
    if (!shortUrl) return;
    mutate(shortUrl, {
      onSuccess: (res) => {
        if (res.data.data.found) {
          setFieldError("shortUrl", "This short url is already taken.");
        }
      },
    });
  }, 200);

  watch("shortUrl", ({ value }) => {
    debouncedCheckUrl(value);
  });

  return (
    <Box maw={400} component="form" onSubmit={onSubmit(handleSubmit)}>
      <Stack>
        <TextInput label="Origin Url" {...getInputProps("originalUrl")} />
        <TextInput
          description={`${window.location.origin}/${getValues().shortUrl}`}
          label="Short Url"
          leftSectionPointerEvents="none"
          {...getInputProps("shortUrl")}
        />

        {isPending && (
          <Text c="gray" size="sm">
            Checking availability ...
          </Text>
        )}

        <Flex justify="end" gap="xs">
          <Button
            variant="light"
            color="gray"
            component={NavLink}
            to="/d"
            replace
          >
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Shorten
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
