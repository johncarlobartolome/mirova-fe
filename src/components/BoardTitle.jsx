import { useState } from "react";
import { Text, TextInput } from "@mantine/core";

export default function BoardTitle({ title }) {
  const [newTitle, setNewTitle] = useState(title);

  const handleFocus = (e) => {
    e.target.select();
  };

  return (
    <TextInput
      autoFocus
      variant="unstyled"
      size="lg"
      mb={20}
      value={newTitle}
      onFocus={handleFocus}
      onChange={(e) => setNewTitle(e.target.value)}
    />
  );
}
