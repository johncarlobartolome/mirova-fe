import {
  ScrollArea,
  Box,
  Text,
  Title,
  Center,
  Flex,
  rem,
  ActionIcon,
  TextInput,
} from "@mantine/core";
import { IconDots, IconPlus } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import AddList from "../components/AddList";
import BoardTitle from "../components/BoardTitle";

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
          <Flex align={"center"} justify={"space-between"}>
            <BoardTitle title={title} />
            <ActionIcon variant="transparent" aria-label="Menu" color="black">
              <IconDots />
            </ActionIcon>
          </Flex>
          <AddList />
        </div>
      </ScrollArea>
    </Box>
  );
}
