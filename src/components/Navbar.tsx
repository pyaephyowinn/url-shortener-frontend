import { IconGauge, IconLogout, IconSettings } from "@tabler/icons-react";
import { Code, Group, Text } from "@mantine/core";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router";

const pageLinks = [{ link: "/d", label: "Your URLs", icon: IconGauge }];

export function Navbar() {
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
        <NavLink
          className={({ isActive }) =>
            `${classes.link} ${isActive ? classes.active : ""}`
          }
          to="/d/settings"
        >
          <IconSettings className={classes.linkIcon} stroke={1.5} />
          <span>Settings</span>
        </NavLink>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
