import { useState } from "react";
import { useParams } from "react-router-dom";
import { Text, TextInput } from "@mantine/core";
import { updateBoard } from "../api/board";

export default function BoardTitle({ title }) {
  const [newTitle, setNewTitle] = useState(title);
  const { boardId } = useParams();

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleBlur = async () => {
    if (newTitle === "") {
      setNewTitle(title);
    }
    try {
      const data = {
        title: newTitle,
      };
      await updateBoard(boardId, data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TextInput
      autoFocus
      size="lg"
      variant="unstyled"
      value={newTitle}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={(e) => setNewTitle(e.target.value)}
    />
  );
}
