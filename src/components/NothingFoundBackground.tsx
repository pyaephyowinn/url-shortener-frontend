import { Button, Container, Group, Text, Title } from "@mantine/core";
import { Illustration } from "./Illustration";
import classes from "./NothingFoundBackground.module.css";

export function NothingFoundBackground() {
  const navigateBack = () => {
    window.history.back();
  };
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text
            c="dimmed"
            size="lg"
            ta="center"
            className={classes.description}
          >
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Group justify="center">
            <Button size="md" onClick={navigateBack}>
              Get back to previous page!
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
