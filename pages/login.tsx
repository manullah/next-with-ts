import { NextPage } from "next";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Flex,
  Input,
  Button,
  InputGroup,
  Box,
  FormControl,
  InputRightElement,
  Heading,
  FormLabel,
  CircularProgress,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

interface IFormInputs {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();

  useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setProviders(setupProviders);
    };
    setTheProviders();
  }, []);

  console.log(providers);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm<IFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    setIsLoading((prev) => !prev);
    setIsLoading((prev) => !prev);
    console.log(data);
  };

  return (
    <>
      <Flex width="full" height="100vh" align="center" justifyContent="center">
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      {...field}
                      type="email"
                      placeholder="test@test.com"
                      size="lg"
                    />
                  </FormControl>
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl id="password" isRequired mt={6}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="*******"
                        size="lg"
                      />
                      <InputRightElement width="3rem">
                        <Button
                          h="1.5rem"
                          size="sm"
                          onClick={() =>
                            setShowPassword((prevState) => !prevState)
                          }
                        >
                          {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                )}
              />
              <Button variant="outline" type="submit" width="full" mt={4}>
                {isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  "Sign In"
                )}
              </Button>
              <a href={providers?.github.signinUrl}>
                <Button variant="outline" width="full" mt={4}>
                  Github Sign in
                </Button>
              </a>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
