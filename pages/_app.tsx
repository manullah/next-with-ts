import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";

/**
 *
 * @param {object} Component
 * @param {object} pageProps
 * @return {object}
 */
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
