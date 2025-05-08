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
import { useDisclosure } from "@mantine/hooks";
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
  const [loading, { open: startLoading, close: stopLoading }] =
    useDisclosure(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignin = async () => {
    startLoading();
    try {
      const res = await signin(formData);
      const accessToken = res.data.data.accessToken;
      setFormErrors({ email: "", password: "" });
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    } catch (error) {
      if (error.response.data.error.details) {
        const errors = formatErrors(error.response.data.error.details);

        setFormErrors((prev) => ({ ...prev, ...errors }));
      }
    } finally {
      stopLoading();
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
          <Button
            loading={loading}
            variant="filled"
            mt="xl"
            w="40%"
            onClick={handleSignin}
          >
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
        <Center>
          <Anchor component={Link} to="/forgot-password">
            Forgot password?
          </Anchor>
        </Center>
      </Fieldset>
    </Container>
  );
}
