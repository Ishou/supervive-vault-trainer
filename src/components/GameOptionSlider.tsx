import { Slider, SliderValue } from "@nextui-org/react";

type Props = {
  id: string;
  value: number;
  isDisabled: boolean;
  label: string;
  format: (val: SliderValue) => string;
  step?: number;
  min: number;
  default: number;
  max: number;
  changeHandler: (id: string, val: number) => void;
};
export default function GameOptionSlider(props: Props) {
  return (
    <Slider
      data-cy={`game-option-${props.id}`}
      data-disabled={props.isDisabled}
      isDisabled={props.isDisabled}
      label={props.label}
      color="secondary"
      value={props.value}
      getValue={props.format}
      minValue={props.min}
      maxValue={props.max}
      step={props.step}
      showSteps={!!props.step}
      marks={[
        { value: props.min, label: props.format(props.min) },
        { value: props.default, label: props.format(props.default) },
        { value: props.max, label: props.format(props.max) },
      ]}
      onChange={(change) => props.changeHandler(props.id, +change)}
    ></Slider>
  );
}
