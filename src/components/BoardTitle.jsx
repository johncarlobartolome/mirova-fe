import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Text, TextInput } from "@mantine/core";
import { updateBoard } from "../api/board";

export default function BoardTitle({ title }) {
  const [newTitle, setNewTitle] = useState(title);
  const previousTitle = useRef(title);
  const { boardId } = useParams();

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleBlur = async () => {
    if (newTitle === "") {
      setNewTitle(title);
      previousTitle.current = title;
    }

    if (newTitle !== previousTitle.current) {
      previousTitle.current = title;
      try {
        const data = {
          title: newTitle,
        };
        await updateBoard(boardId, data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <TextInput
      size="lg"
      variant="unstyled"
      value={newTitle}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={(e) => setNewTitle(e.target.value)}
    />
  );
}
