"use client";

import * as React from "react";
import "@/app/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Geist } from "next/font/google";

/* istanbul ignore next */
const inter = Geist({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`dark text-foreground bg-background ${inter.className}`}>
        <NextUIProvider className="min-h-screen h-full grow grid grid-cols-6">
          {props.children}
        </NextUIProvider>
      </body>
    </html>
  );
}
