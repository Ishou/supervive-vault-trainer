import "@fontsource/geist-sans";
import "./globals.css";
import { createRoot } from "react-dom/client";
import {
  Alert,
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
import { Suspense } from "react";
import { GameOptionsProvider } from "./components/GameOptions/GameOptionsContext";
import GameOptionsForm from "./components/GameOptions/GameOptionsForm";
import GameResult from "./components/GameResult";
import PlayStopTrigger from "./components/PlayStopTrigger";
import FpsCounter from "./components/FpsCounter";

const rootElement = document.querySelector("#root") as Element;

createRoot(rootElement).render(
  <NextUIProvider className="min-h-screen h-full w-full grid max-w-5xl mx-auto p-4">
    <div className="my-auto flex flex-col gap-4">
      <Card isFooterBlurred>
        <CardHeader as={header}>
          <Link href="#" color="foreground" role="link">
            <h1 className="text-lg">Supervive Vault Trainer</h1>
          </Link>
          <div className="grow"></div>
          <Link
            data-cy="github-link"
            role="link"
            isExternal
            showAnchorIcon
            href={__APP_REPOSITORY__}
          >
            GitHub
          </Link>
        </CardHeader>
        <Divider />
        <CardBody>
          <Suspense fallback={<p>Loading...</p>}>
            <GameOptionsProvider>
              <div className="grid grid-cols-2 gap-8 mx-4" data-cy="game">
                <div className="col-span-2 my-auto flex flex-col xl:col-span-1">
                  <div className="flex flex-col justify-center">
                    <GameResult />

                    <Game />

                    <PlayStopTrigger />

                    <FpsCounter />
                  </div>
                </div>

                <div className="col-span-2 xl:col-span-1 flex flex-col gap-4">
                  <GameOptionsForm />
                </div>
              </div>
            </GameOptionsProvider>
          </Suspense>
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

      <Card>
        <CardHeader className="text-xl">Vault Mechanics</CardHeader>
        <CardBody className="text-justify flex flex-col gap-4">
          <Alert
            color="success"
            variant="flat"
            title="Successfully stopping the cursor in a green area deals damage to the vault
                  gate and increases the lock-picking difficulty by reducing the
                  area sizes."
            description={
              <ul className="mt-2 list-disc list-inside">
                <li>
                  <b>Good Stop:</b> Stopping the cursor in the darker green area
                  deals 3063 damage to the vault gate.
                </li>
                <li>
                  <b>Perfect Stop:</b> Stopping the cursor in the lighter green
                  area results in a "perfect" stop, dealing 6125 damage to the
                  vault gate and spawning a red pylon (maximum of 2).
                </li>
              </ul>
            }
          />

          <Alert
            color="danger"
            variant="flat"
            title="Failing decreases difficulty, but spawns blue orbs that
                  float toward you."
            description={
              <ul className="mt-2 list-disc list-inside">
                <li className="font-bold">Stopping too early / late.</li>
                <li className="font-bold">Exiting prematurely.</li>
                <li className="font-bold">Getting hit.</li>
                <li className="font-bold">Waiting for 2 laps.</li>
              </ul>
            }
          />

          <Alert
            color="primary"
            variant="flat"
            title="Teammate Assistance"
            description={
              <ul className="mt-2 list-disc list-inside">
                <li>
                  <b>Destroying Red Pylons</b> reduces difficulty and directly
                  damages the vault gate for an additional 6125 damage.
                </li>
                <li>
                  <b>Destroying Blue Orbs</b> prevents you from taking damage
                  and being forced out of the mini-game.
                </li>
                <li>
                  <b>Hitting the Vault Gate</b> also counts as damage to open
                  it.
                </li>
              </ul>
            }
          />
        </CardBody>
      </Card>
    </div>
  </NextUIProvider>,
);
