import {
  Center,
  Container,
  Fieldset,
  TextInput,
  Title,
  Text,
  Button,
  Anchor,
  ActionIcon,
} from "@mantine/core";
import { useState } from "react";
import { IconEye } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { signin } from "../api/auth";
import { useNavigate } from "react-router-dom";
import formatErrors from "../utils/formatErrors";

export default function SignInPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [seePassword, setSeePassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignin = async () => {
    try {
      await signin(formData);
      setFormErrors({ email: "", password: "" });
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.data.error.details) {
        const errors = formatErrors(error.response.data.error.details);
        setFormErrors((prev) => ({ ...prev, ...errors }));
      }
    }
  };

  const handleSeePassword = () => {
    setSeePassword(!seePassword);
  };

  return (
    <Container size="xs" mt="xl">
      <Fieldset>
        <Center>
          <Title>Signin</Title>
        </Center>
        <Center>
          <Text>Welcome back!</Text>
        </Center>
        <TextInput
          label="Email"
          name="email"
          value={formData.email}
          placeholder="you@example.com"
          mt="md"
          error={formErrors.email}
          onChange={handleChange}
        />
        <TextInput
          label="Password"
          name="password"
          value={formData.password}
          type={seePassword ? "text" : "password"}
          mt="md"
          error={formErrors.password}
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
        <Center>
          <Button variant="filled" mt="xl" w="40%" onClick={handleSignin}>
            Sign In
          </Button>
        </Center>
        <Center mt="xs">
          <Text>
            Don't have account?{" "}
            <Anchor component={Link} to="/signup">
              Sign Up
            </Anchor>
          </Text>
        </Center>
      </Fieldset>
    </Container>
  );
}
