import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useViewportSize } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { Fieldset, TextInput, Button, Flex, ActionIcon } from "@mantine/core";
import formatErrors from "../utils/formatErrors";
import { resetPassword } from "../api/auth";

export default function ResetPasswordPage() {
  const [seePassword, setSeePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState("");
  const { height } = useViewportSize();

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const resetTokenParam = searchParams.get("resetToken");
  console.log(resetTokenParam);
  const handleChange = (e) => {
    setErrorNewPassword("");
    setNewPassword(e.target.value);
  };

  const handleSeePassword = () => {
    setSeePassword(!seePassword);
  };

  const handleClick = async () => {
    try {
      const data = { password: newPassword };
      await resetPassword(data, resetTokenParam);
      navigate("/signin");
    } catch (error) {
      console.log(error);
      if (error.response.data.errors) {
        const errors = formatErrors(error.response.data.errors);
        setErrorNewPassword(errors["password"]);
      }
    }
  };

  return (
    <Flex h={height} justify={"center"} align={"center"}>
      <Fieldset w={"400px"}>
        <TextInput
          label="New Password"
          name="password"
          value={newPassword}
          type={seePassword ? "text" : "password"}
          mt="md"
          error={errorNewPassword}
          rightSection={
            <ActionIcon
              variant="transparent"
              color={seePassword ? "black" : "gray"}
              onClick={handleSeePassword}
            >
              <IconEye />
            </ActionIcon>
          }
          onChange={handleChange}
        />
        <Button fullWidth mt="md" onClick={handleClick}>
          Reset Password
        </Button>
      </Fieldset>
    </Flex>
  );
}
