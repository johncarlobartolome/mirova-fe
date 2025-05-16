import { AppShell, NavLink } from "@mantine/core";
import { IconLayoutBoardSplit } from "@tabler/icons-react";

export default function Sidebar() {
  return (
    <AppShell.Navbar p="md">
      <NavLink label="Boards" leftSection={<IconLayoutBoardSplit />}>
        <NavLink href="#required-for-focus" label="Create board" />
      </NavLink>
    </AppShell.Navbar>
  );
}
