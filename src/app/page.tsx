"use client";

import LockPicker from "@/components/LockPicker";
import React, { useState } from "react";
import LockPickerOptionList, {
  LockPickerOptions,
} from "@/components/LockPickerOptionList";
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

export default function HomePage() {
  const [options, setOptions] = useState<LockPickerOptions>({
    speed: 1.2,
    size: 145,
    perfectSize: 50,
  });

  return (
    <div className="grid p-4 col-span-6 w-full max-w-5xl mx-auto md:col-start-2 md:col-span-4">
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
          <div>Web App by Colin Auberger</div>
          <div className="text-center order-last xl:order-none">
            Fan-made Mini Game based on the vault mechanic from{" "}
            <b>Theorycraft Games Inc&apos;s</b> <b>SUPERVIVE</b>.
          </div>
          <div>v0.0.0</div>
        </CardFooter>
      </Card>
    </div>
  );
}
