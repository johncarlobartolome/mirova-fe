import { ScrollArea, Box, Text, Title, Card, Group, rem } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import AddList from "../components/AddList";

export default function BoardPage() {
  const location = useLocation();
  const { title } = location.state || {};
  return (
    <Box>
      <ScrollArea
        type="auto"
        offsetScrollbars
        style={{ height: "calc(100vh - 96px)", width: "100%" }}
      >
        <div
          style={{
            whiteSpace: "nowrap",
            gap: rem(16),
          }}
        >
          <Text>{title}</Text>
          <AddList />
        </div>
      </ScrollArea>
    </Box>
  );
}
