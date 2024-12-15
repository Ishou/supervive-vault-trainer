import "./app/globals.css";
import { createRoot } from "react-dom/client";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  NextUIProvider,
} from "@nextui-org/react";
import { footer, header } from "framer-motion/m";
import Game from "./components/Game";

const rootElement = document.querySelector("#root") as Element;

createRoot(rootElement).render(
  <NextUIProvider className="min-h-screen h-full w-full grid max-w-5xl mx-auto p-4">
    <Card className="my-auto" isFooterBlurred>
      <CardHeader as={header}>
        <p className="text-lg">Supervive Vault Trainer</p>
        <div className="grow"></div>
        <Link role="link" isExternal showAnchorIcon href={__APP_REPOSITORY__}>
          GitHub
        </Link>
      </CardHeader>
      <Divider />
      <CardBody>
        <Game />
      </CardBody>
      <Divider />
      <CardFooter
        as={footer}
        className="w-full text-xs flex flex-col xl:flex-row xl:justify-between"
      >
        <div>
          Copyright &copy; {new Date().getFullYear()} {__APP_AUTHOR_NAME__}
        </div>
        <div className="text-center order-last xl:order-none">
          Fan-made unofficial mini-game, based on the vault mechanic from{" "}
          <b>Theorycraft Games Inc&apos;s</b> <b>SUPERVIVE</b>.
        </div>
        <div>v{__APP_VERSION__}</div>
      </CardFooter>
    </Card>
  </NextUIProvider>,
);
