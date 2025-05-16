import {
  Container,
  Stack,
  Group,
  Title,
  Grid,
  Card,
  Text,
  Center,
  Button,
  Modal,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { createBoard, getBoards } from "../api/board";
import formatErrors from "../utils/formatErrors";
import { useNavigate } from "react-router-dom";

export default function Boards() {
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBoards();
        setBoards((prev) => [...prev, ...res.data.data.boards]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleCreateBoard = async () => {
    try {
      const res = await createBoard({ title });
      console.log(res);
      setBoards((prev) => [...prev, { title }]);
      close();
    } catch (error) {
      if (error.response.data.errors) {
        const errors = formatErrors(error.response.data.errors);
        setErrorTitle(errors["title"]);
      }
    } finally {
      setTitle("");
    }
  };

  const handleChangeTitle = (e) => {
    setErrorTitle("");
    setTitle(e.target.value);
  };

  const handleBoardClick = (board) => {
    navigate(`/board/${board._id}`, { state: { title: board.title } });
  };

  return (
    <Container size="xl">
      <Title>Boards</Title>
      <Grid mt="lg">
        {boards.map((board, index) => {
          return (
            <Grid.Col span={3} key={index}>
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                onClick={() => handleBoardClick(board)}
              >
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{board.title}</Text>
                </Group>
              </Card>
            </Grid.Col>
          );
        })}
        <Grid.Col
          span={3}
          onClick={() => {
            open();
            setErrorTitle("");
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ backgroundColor: "var(--mantine-color-gray-1)" }}
          >
            <Group justify="center" mt="md" mb="xs">
              <Center>
                <Text>Create new board</Text>
              </Center>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>
      <Modal opened={opened} onClose={close} title="Create board">
        <Stack>
          <TextInput
            name="title"
            label="Title"
            value={title}
            error={errorTitle}
            onChange={handleChangeTitle}
          />
          <Button onClick={handleCreateBoard}>Create</Button>
        </Stack>
      </Modal>
    </Container>
  );
}
