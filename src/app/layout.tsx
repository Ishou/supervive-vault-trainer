"use client";
import * as React from "react";
import "@/app/globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/app/theme";
import { Container, Stack } from "@mui/material";
import AppNav from "@/components/AppNav";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Stack className="min-h-full">
              <AppNav />

              <Container className="grow grid grid-cols-6">
                {props.children}
              </Container>
            </Stack>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
