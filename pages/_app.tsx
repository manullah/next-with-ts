import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";

/**
 *
 * @param {object} Component
 * @param {object} pageProps
 * @return {object}
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
