import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

import React from "react";
import type { ExtendedAppProps } from "../lib/types";
import { QueryClient, QueryClientProvider } from "react-query";

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

          <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>

      </ThemeProvider>
    </ApolloProvider>


  );
}

export default MyApp;
