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
} from "@mantine/core";
import { IconMenu2, IconLogout } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { ReactComponent as MirovaLogo } from "../assets/mirova-logo.svg";

export default function Header() {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    navigate("/signin");
  };
  return (
    <AppShell.Header>
      <Group h="100%" px="md">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Group justify="space-between" style={{ flex: 1 }}>
          <Group>
            <MirovaLogo
              style={{ width: "36px", height: "auto" }}
              fill="black"
            />

            <Title>Mirova</Title>
          </Group>
          <Menu>
            <Menu.Target>
              <ActionIcon
                color="black"
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
  );
}
