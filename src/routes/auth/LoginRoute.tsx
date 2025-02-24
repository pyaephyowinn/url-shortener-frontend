import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./LoginRoute.module.css";
import { useLogin } from "./queries";
import { useForm, zodResolver } from "@mantine/form";
import { loginSchema, LoginType } from "@/configs/schemas";
import { NavLink } from "react-router";
import { useCheckRedirect } from "@/hooks/useCheckRedirect";
import { PageLoading } from "@/components/PageLoading";

export function LoginRoute() {
  const { loading } = useCheckRedirect();
  const { getInputProps, onSubmit, key } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginSchema),
  });
  const { mutate, isPending } = useLogin();

  const handleSubmit = (values: LoginType) => {
    mutate(values);
  };

  if (loading) {
    return <PageLoading label="Checking authentication ..." />;
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component={NavLink} to="/register">
          Create account
        </Anchor>
      </Text>

      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        component="form"
        onSubmit={onSubmit(handleSubmit)}
      >
        <TextInput
          label="Email"
          placeholder="Your email"
          required
          key={key("email")}
          {...getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          key={key("password")}
          {...getInputProps("password")}
        />
        <Group justify="end" mt="lg">
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" type="submit" loading={isPending}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
