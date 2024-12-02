import { LockPickerProps } from "@/components/LockPicker/LockPicker";
import { Box, Slider, Typography } from "@mui/material";
import React, { useState } from "react";

const optionKeys = ["speed", "size", "perfectSize"] as const;

type OptionKey = (typeof optionKeys)[number];
type LockPickerOptionModel = {
  key: OptionKey;
  label: string;
  format: (val: number) => string;
  min: number;
  max: number;
  value?: number;
  step?: number;
};

const optionModels: LockPickerOptionModel[] = [
  {
    key: "speed",
    label: "Speed",
    format: (val) => `${val} RPS`,
    step: 0.05,
    min: 0.5,
    max: 2,
  },
  {
    key: "size",
    label: "Size",
    format: (val) => `${val} °`,
    min: 5,
    max: 120,
  },
  {
    key: "perfectSize",
    label: "Perfect Size",
    format: (val) => `${val} %`,
    min: 1,
    max: 100,
  },
];

export type LockPickerOptions = Record<OptionKey, number>;

export default function LockPickerOptionList(props: {
  options: LockPickerOptions;
  changeHandler: (options: LockPickerOptions) => void;
}) {
  const { options } = props;

  const optionsChange = (key: OptionKey, change: number) => {
    props.changeHandler({ ...options, [key]: change });
  };

  return (
    <>
      {optionModels.map((model) => (
        <Box key={model.key}>
          <Typography>{model.label}: </Typography>
          <Typography>{options[model.key]}</Typography>
          <div className="mx-4">
            <Slider
              color="secondary"
              value={options[model.key]}
              valueLabelDisplay="auto"
              min={model.min}
              max={model.max}
              step={model.step}
              marks={[
                { value: model.min, label: model.format(model.min) },
                { value: model.max, label: model.format(model.max) },
              ]}
              onChange={(_, change) => optionsChange(model.key, +change)}
            ></Slider>
          </div>
        </Box>
      ))}
    </>
  );
}
