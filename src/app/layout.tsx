"use client";

import * as React from "react";
import "@/app/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Geist } from "next/font/google";

import packageInfos from "package.json";

/* istanbul ignore next */
const inter = Geist({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Supervive Vault Trainer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="title" content="Supervive Vault Trainer" />
        <meta name="description" content={packageInfos.description} />
        <meta name="keywords" content="supervive vault lock pick mini game" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content={packageInfos.author.name} />
      </head>
      <body className={`dark text-foreground bg-background ${inter.className}`}>
        <NextUIProvider className="min-h-screen h-full grow grid grid-cols-6">
          {props.children}
        </NextUIProvider>
      </body>
    </html>
  );
}
