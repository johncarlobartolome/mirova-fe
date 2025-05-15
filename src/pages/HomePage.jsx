import { useNavigate } from "react-router-dom";
import {
  AppShell,
  Container,
  Group,
  Burger,
  NavLink,
  Stack,
  Title,
  ActionIcon,
  Menu,
  Grid,
  Card,
  Image,
  Text,
  Badge,
} from "@mantine/core";
import Boards from "../components/Boards";
import {
  IconLayoutBoardSplit,
  IconMenu2,
  IconLogout,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { ReactComponent as MirovaLogo } from "../assets/mirova-icon.svg";

export default function HomePage() {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    navigate("/signin");
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Group>
              <MirovaLogo
                style={{ width: "42px", height: "auto" }}
                fill="cyan"
              />

              <Title>Mirova</Title>
            </Group>
            <Menu>
              <Menu.Target>
                <ActionIcon
                  variant="transparent"
                  style={{ justifySelf: "end" }}
                >
                  <IconMenu2 />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconLogout size={14} />}
                  onClick={handleLogOut}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink label="Boards" leftSection={<IconLayoutBoardSplit />}>
          <NavLink href="#required-for-focus" label="Create board" />
        </NavLink>
      </AppShell.Navbar>
      <AppShell.Main>
        <Boards />
      </AppShell.Main>
    </AppShell>
  );
}
