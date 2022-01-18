import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

import React from "react";
import type { ExtendedAppProps } from "../lib/types";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";

import WithAuth from "../lib/auth/WithAuth";

export const queryClient = new QueryClient();

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "/api",
});

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: ExtendedAppProps) {
  return (
    
    <ApolloProvider client={client}>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        disableTransitionOnChange
      >
        <SessionProvider session={session} refetchInterval={5 * 60}>
          <QueryClientProvider client={queryClient}>
            {Component.auth ? (
              <WithAuth options={Component.auth}>
                <Component {...pageProps} />
              </WithAuth>
            ) : (
              <Component {...pageProps} />
            )}
            </QueryClientProvider>
          </SessionProvider>
      </ThemeProvider>
    </ApolloProvider>


  );
}

export default MyApp;
