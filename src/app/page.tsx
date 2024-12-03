"use client";

import LockPicker from "@/components/LockPicker/LockPicker";
import React, { useState } from "react";
import LockPickerOptionList, {
  LockPickerOptions,
} from "@/components/LockPicker/LockPickerOptionList";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import { footer, header } from "framer-motion/m";

export default function Home() {
  const [options, setOptions] = useState<LockPickerOptions>({
    speed: 1.2,
    size: 12,
    perfectSize: 25,
  });

  return (
    <div className="grid p-4 col-span-6 md:col-start-2 md:col-span-4">
      <Card className="my-auto" isFooterBlurred>
        <CardHeader as={header}>
          <p className="text-lg">Supervive Vault Trainer</p>
          <div className="grow"></div>
          <Button
            as={Link}
            role="link"
            showAnchorIcon
            href="https://github.com/Ishou/supervive-vault-trainer"
            target="_blank"
            variant="flat"
          >
            GitHub
          </Button>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-8 gap-8 mx-4">
            <div className="col-span-8 my-auto flex flex-col lg:col-span-4">
              <LockPicker options={options} radius={64} />
            </div>
            <div className="col-span-8 lg:col-span-4">
              <LockPickerOptionList
                options={options}
                changeHandler={(change) => setOptions(change)}
              />
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter
          as={footer}
          className="w-full text-xs flex flex-col xl:flex-row xl:justify-between"
        >
          <div>WebApp by Colin Auberger</div>
          <div className="text-center order-last xl:order-none">
            Minigame concept taken from <b>Supervive</b>, a <b>Theorycraft</b>{" "}
            trademark and copyright.
          </div>
          <div>v0.0.0-ALPHA</div>
        </CardFooter>
      </Card>
    </div>
  );
}
