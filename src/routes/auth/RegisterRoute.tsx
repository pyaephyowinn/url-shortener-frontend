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
import { useRegister } from "./queries";
import { useForm, zodResolver } from "@mantine/form";
import { loginSchema, RegisterType } from "@/configs/schemas";
import { NavLink } from "react-router";

export function RegisterRoute() {
  const { getInputProps, onSubmit, key } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginSchema),
  });
  const { mutate, isPending } = useRegister();

  const handleSubmit = (values: RegisterType) => {
    mutate(values);
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Create your account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do you have an account?{" "}
        <Anchor size="sm" component={NavLink} to="/">
          Sign in
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
          Sign Up
        </Button>
      </Paper>
    </Container>
  );
}
