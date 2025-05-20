import { ScrollArea, Box, Menu, Flex, rem, ActionIcon } from "@mantine/core";
import { IconDots, IconTrashFilled } from "@tabler/icons-react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import AddList from "../components/AddList";
import BoardTitle from "../components/BoardTitle";
import { deleteBoard } from "../api/board";

export default function BoardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { title } = location.state || {};
  const { boardId } = useParams();

  const handleDeleteBoard = async () => {
    try {
      const res = await deleteBoard(boardId);
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

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
            <Menu>
              <Menu.Target>
                <ActionIcon
                  variant="transparent"
                  aria-label="Menu"
                  color="black"
                >
                  <IconDots />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  color="red"
                  leftSection={<IconTrashFilled size={14} />}
                  onClick={handleDeleteBoard}
                >
                  Delete board
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
          <AddList />
        </div>
      </ScrollArea>
    </Box>
  );
}
