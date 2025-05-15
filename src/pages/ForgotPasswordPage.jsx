import { useEffect, useState } from "react";
import { useViewportSize } from "@mantine/hooks";
import {
  Flex,
  Fieldset,
  TextInput,
  Button,
  Card,
  Center,
  Badge,
  Image,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forgotPassword } from "../api/auth";
import formatErrors from "../utils/formatErrors";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [loading, { open: startLoading, close: stopLoading }] =
    useDisclosure(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const { height } = useViewportSize();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let intervalId;
    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false);
      setTimeLeft(60);
    }
  }, [timeLeft]);

  const handleChange = (e) => {
    setErrorEmail("");
    setEmail(e.target.value);
  };

  const handleClick = async (btn) => {
    startLoading();
    try {
      const data = { email };
      await forgotPassword(data);
      setLinkSent(true);
      if (btn === "resend") {
        setIsRunning(true);
      }
    } catch (error) {
      if (error.response.data.errors) {
        const errors = formatErrors(error.response.data.errors);
        setErrorEmail(errors["email"]);
      }
    } finally {
      stopLoading();
    }
  };

  return (
    <Flex h={height} justify={"center"} align={"center"}>
      {linkSent ? (
        <Card shadow="sm" padding="lg" radius="md" withBorder w={"400px"}>
          <Center>
            <Text fw={500}>Recover Link Sent</Text>
          </Center>

          <Text size="sm" c="dimmed" mt="lg">
            We have sent a recovery link in the email you provided. Please check
            in order to reset your password.
          </Text>

          <Button
            loading={loading}
            disabled={isRunning ? true : false}
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            onClick={() => handleClick("resend")}
          >
            Resend Link {isRunning ? `${formatTime(timeLeft)}` : ""}
          </Button>
        </Card>
      ) : (
        <Fieldset w={"400px"}>
          <TextInput
            name="email"
            label="Email"
            value={email}
            placeholder="you@example.com"
            error={errorEmail}
            onChange={handleChange}
          />
          <Button
            loading={loading}
            fullWidth
            mt="md"
            onClick={() => handleClick("send")}
          >
            Send Password Recovery Link
          </Button>
        </Fieldset>
      )}
    </Flex>
  );
}
