import { Card, Group, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import classes from "./AddList.module.css";

export default function AddList() {
  return (
    <Card shadow="sm" className={classes.container} mr={"lg"} draggable>
      <Group>
        <IconPlus />
        <Text>Add list</Text>
      </Group>
    </Card>
  );
}
