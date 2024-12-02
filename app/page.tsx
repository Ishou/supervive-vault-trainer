"use client";

import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import LockPicker from "@/components/LockPicker/LockPicker";
import React, { useState } from "react";
import LockPickerOptionList, {
  LockPickerOptions,
} from "@/components/LockPicker/LockPickerOptionList";

export default function Home() {
  const [options, setOptions] = useState<LockPickerOptions>({
    speed: 1.2,
    size: 12,
    perfectSize: 25,
  });

  return (
    <div className="grid py-4 col-span-6 md:col-start-2 md:col-span-4">
      <Card className="my-auto">
        <CardHeader title="v0.0.0-ALPHA" />
        <Divider />
        <CardContent>
          <div className="grid grid-cols-8 gap-8 mx-8">
            <div className="col-span-4 my-auto flex flex-col">
              <LockPicker options={options} />
            </div>

            <div className="col-span-4">
              <LockPickerOptionList
                options={options}
                changeHandler={(change) => setOptions(change)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
