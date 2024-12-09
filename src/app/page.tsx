"use client";

import LockPicker from "@/components/LockPicker";
import React from "react";
import LockPickerOptionsForm from "@/components/LockPickerOptionsForm";
import LockPickerProvider from "@/components/LockPickerContext";

export default function HomePage() {
  return (
    <LockPickerProvider>
      <div className="grid grid-cols-2 gap-8 mx-4">
        <div className="col-span-2 my-auto flex flex-col xl:col-span-1">
          <LockPicker />
        </div>

        <LockPickerOptionsForm />
      </div>
    </LockPickerProvider>
  );
}
