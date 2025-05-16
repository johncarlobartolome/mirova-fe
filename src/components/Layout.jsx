import { Outlet } from "react-router-dom";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <Header />
      <Sidebar toggle={toggle} />

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
