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
import { IconEye } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import formatErrors from "../utils/formatErrors";
import { signup } from "../api/auth";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [seePassword, setSeePassword] = useState(false);
  const [loading, { open: startLoading, close: stopLoading }] =
    useDisclosure(false);

  const navigate = useNavigate();

  const handleSeePassword = () => {
    setSeePassword(!seePassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    startLoading();
    try {
      await signup(formData);
      setFormErrors({ name: "", email: "", password: "" });
      navigate("/");
    } catch (error) {
      console.log(error.response.data.errors);
      if (error.response.data.errors) {
        const errors = formatErrors(error.response.data.errors);
        setFormErrors((prev) => ({ ...prev, ...errors }));
      }
    } finally {
      stopLoading();
    }
  };

  return (
    <Container size="xs" mt="xl">
      <Fieldset>
        <Center>
          <Title>Signup</Title>
        </Center>
        <Center>
          <Text>Create your account</Text>
        </Center>

        <TextInput
          name="name"
          label="Name"
          value={formData.name}
          placeholder="Your name"
          mt="lg"
          error={formErrors.name}
          onChange={handleChange}
        />
        <TextInput
          name="email"
          label="Email"
          value={formData.email}
          placeholder="you@example.com"
          mt="md"
          error={formErrors.email}
          onChange={handleChange}
        />
        <TextInput
          name="password"
          label="Password"
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
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </Center>
        <Center mt="xs">
          <Text>
            Already have an account?{" "}
            <Anchor component={Link} to="/signin">
              Sign In
            </Anchor>
          </Text>
        </Center>
      </Fieldset>
    </Container>
  );
}
