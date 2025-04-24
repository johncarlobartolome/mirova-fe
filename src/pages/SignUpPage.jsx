import {
  Center,
  Container,
  Fieldset,
  TextInput,
  Title,
  Text,
  Button,
  Anchor,
} from "@mantine/core";
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    try {
      await signup(formData);
      setFormErrors({ name: "", email: "", password: "" });
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.data.error.details) {
        const errors = formatErrors(error.response.data.error.details);
        setFormErrors((prev) => ({ ...prev, ...errors }));
      }
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
          type="password"
          mt="md"
          error={formErrors.password}
          onChange={handleChange}
        />
        <Center>
          <Button variant="filled" mt="xl" w="40%" onClick={handleSignup}>
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
