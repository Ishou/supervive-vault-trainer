import React from "react";
import { Slider, SliderValue } from "@nextui-org/react";

type OptionKey = "speed" | "size" | "perfectSize";
type LockPickerOptionModel = {
  key: OptionKey;
  label: string;
  format: (val: SliderValue) => string;
  min: number;
  default: number;
  max: number;
  value?: number;
  step?: number;
};

const optionModels: LockPickerOptionModel[] = [
  {
    key: "speed",
    label: "Speed",
    format: (val) => `${val}RPS`,
    step: 0.05,
    min: 0.5,
    default: 1.2,
    max: 2,
  },
  {
    key: "size",
    label: "Size",
    format: (val) => `${val}°`,
    min: 5,
    default: 12,
    max: 120,
  },
  {
    key: "perfectSize",
    label: "Perfect Size",
    format: (val) => `${val}%`,
    min: 1,
    default: 25,
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
    <div className="flex flex-col gap-4">
      {optionModels.map((model) => (
        <div key={model.key}>
          <Slider
            label={model.label}
            color="secondary"
            value={options[model.key]}
            getValue={model.format}
            minValue={model.min}
            maxValue={model.max}
            step={model.step}
            showSteps={!!model.step}
            marks={[
              { value: model.min, label: model.format(model.min) },
              { value: model.default, label: model.format(model.default) },
              { value: model.max, label: model.format(model.max) },
            ]}
            onChange={(change) => optionsChange(model.key, +change)}
          ></Slider>
        </div>
      ))}
    </div>
  );
}
