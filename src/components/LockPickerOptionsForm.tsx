import { Button, Slider, SliderValue, Switch } from "@nextui-org/react";
import React, { useContext } from "react";
import {
  LockPickerContext,
  LockPickerDispatchContext,
  LockPickerOptionKey,
} from "@/components/LockPickerContext";

const optionModels = [
  {
    key: "speed" as LockPickerOptionKey,
    label: "Speed",
    format: (val: SliderValue) => `${val}RPS`,
    step: 0.05,
    min: 0.5,
    default: 1,
    max: 2,
  },
  {
    key: "size" as LockPickerOptionKey,
    label: "Size",
    format: (val: SliderValue) => `${val}°`,
    min: 5,
    default: 145,
    max: 145,
  },
  {
    key: "perfectMultiplier" as LockPickerOptionKey,
    label: "Perfect Size",
    format: (val: SliderValue) => `${val}%`,
    min: 1,
    default: 50,
    max: 100,
  },
];

export default function LockPickerOptionsForm() {
  const { autoDifficulty, options } = useContext(LockPickerContext);
  const dispatch = useContext(LockPickerDispatchContext);

  const difficultyResetHandler = () =>
    dispatch({
      type: "resetDifficulty",
    });

  return (
    <div className="col-span-2 xl:col-span-1 flex flex-col gap-4">
      <Switch
        isSelected={autoDifficulty}
        onValueChange={() =>
          dispatch({
            type: "toggleAutoDifficulty",
          })
        }
      >
        Adapt options based on difficulty
      </Switch>

      <div>
        <Button
          isDisabled={!autoDifficulty}
          color="secondary"
          variant="faded"
          onClick={difficultyResetHandler}
        >
          Reset difficulty
        </Button>
      </div>

      {optionModels.map((model) => (
        <div key={model.key}>
          <Slider
            data-cy={`lock-picker-option-${model.key}`}
            isDisabled={autoDifficulty}
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
