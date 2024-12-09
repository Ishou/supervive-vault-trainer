import * as React from "react";
import "@/app/globals.css";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  NextUIProvider,
} from "@nextui-org/react";
import { Geist } from "next/font/google";

import packageInfos from "package.json";
import { footer, header } from "framer-motion/m";

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
        <NextUIProvider className="min-h-screen h-full w-full grid max-w-5xl mx-auto p-4">
          <Card className="my-auto" isFooterBlurred>
            <CardHeader as={header}>
              <p className="text-lg">Supervive Vault Trainer</p>
              <div className="grow"></div>
              <Button
                as={Link}
                role="link"
                showAnchorIcon
                href={packageInfos.repository}
                target="_blank"
                variant="flat"
              >
                GitHub
              </Button>
            </CardHeader>
            <Divider />
            <CardBody>{props.children}</CardBody>
            <Divider />
            <CardFooter
              as={footer}
              className="w-full text-xs flex flex-col xl:flex-row xl:justify-between"
            >
              <div>
                Copyright &copy; {new Date().getFullYear()}{" "}
                {packageInfos.author.name}
              </div>
              <div className="text-center order-last xl:order-none">
                Fan-made unofficial mini-game, based on the vault mechanic from{" "}
                <b>Theorycraft Games Inc&apos;s</b> <b>SUPERVIVE</b>.
              </div>
              <div>v{packageInfos.version}</div>
            </CardFooter>
          </Card>
        </NextUIProvider>
      </body>
    </html>
  );
}
