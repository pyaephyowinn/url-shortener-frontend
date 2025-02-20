import { IconGauge, IconLogout } from "@tabler/icons-react";
import { Button, Code, Group, Text } from "@mantine/core";
import classes from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router";
import { modals } from "@mantine/modals";
import { useUserStore } from "@/store/useUser";

const pageLinks = [{ link: "/d", label: "Your URLs", icon: IconGauge }];

export function Navbar() {
  const { removeUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () =>
    modals.openConfirmModal({
      centered: true,
      title: "Are you sure?",
      children: <Text size="sm">Are you sure you want to logout?</Text>,

      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => {
        removeUser();
        navigate("/", { replace: true });
      },
    });

  const links = pageLinks.map((item) => (
    <NavLink
      className={({ isActive }) =>
        `${classes.link} ${isActive ? classes.active : ""}`
      }
      to={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Text size="xl" fw={600}>
            URL Shortener
          </Text>
          <Code className={classes.code}>v1.0.0</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <Button
          onClick={handleLogout}
          className={classes.link}
          variant="subtle"
          w="100%"
          c="dark"
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Button>
      </div>
    </nav>
  );
}
