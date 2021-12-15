import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider } from "next-auth/react";

/**
 *
 * @param {object} Component
 * @param {object} pageProps
 * @return {object}
 */
function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
