import React, { useContext } from "react";
import { Slider, SliderValue } from "@nextui-org/react";
import {
  LockPickerContext,
  LockPickerDispatchContext,
} from "@/components/LockPickerContext";

type OptionKey = "speed" | "size" | "perfectMultiplier";
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
    default: 1,
    max: 2,
  },
  {
    key: "size",
    label: "Size",
    format: (val) => `${val}°`,
    min: 5,
    default: 145,
    max: 145,
  },
  {
    key: "perfectMultiplier",
    label: "Perfect Size",
    format: (val) => `${val}%`,
    min: 1,
    default: 50,
    max: 100,
  },
];

export type LockPickerOptions = { autoDifficulty?: boolean } & Record<
  OptionKey,
  number
>;

export default function LockPickerOptionList() {
  const { options } = useContext(LockPickerContext);
  const dispatch = useContext(LockPickerDispatchContext);

  return (
    <div className="flex flex-col gap-4">
      {optionModels.map((model) => (
        <div key={model.key}>
          <Slider
            data-cy={`lock-picker-option-${model.key}`}
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
            onChange={(change) =>
              dispatch({ type: "setOption", key: model.key, value: +change })
            }
          ></Slider>
        </div>
      ))}
    </div>
  );
}
