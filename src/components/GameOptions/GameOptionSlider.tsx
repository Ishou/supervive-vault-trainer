import { Slider, SliderValue } from "@nextui-org/react";
import {
  GameSliderOption,
  useGameOptions,
  useGameOptionsDispatch,
} from "./GameOptionsContext";

type Props = {
  id: GameSliderOption;
  label: string;
  format: (val: SliderValue) => string;
  step?: number;
  min: number;
  default: number;
  max: number;
};
export default function GameOptionSlider(props: Props) {
  const options = useGameOptions();
  const optionsDispatch = useGameOptionsDispatch();

  // TODO meh
  const value =
    props.id === "perfectMultiplier"
      ? (options.difficulty.perfectSize * 100) / options.difficulty.okSize
      : options.difficulty[props.id];

  const changeHandler = (val: number) => {
    optionsDispatch({
      type: "changeSliderValue",
      key: props.id,
      value: val,
    });
  };

  return (
    <Slider
      data-cy={`game-option-${props.id}`}
      data-disabled={options.withAutoDifficulty}
      isDisabled={options.withAutoDifficulty}
      label={props.label}
      color="secondary"
      value={value}
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
      onChange={(change) => changeHandler(+change)}
    ></Slider>
  );
}
