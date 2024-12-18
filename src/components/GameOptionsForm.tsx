import { Button, Switch } from "@nextui-org/react";
import { useState } from "react";
import GameOptionSlider from "./GameOptionSlider";
import { GameDifficulties, GameDifficulty } from "./GameDifficulties";

export type GameOptions = {
  withCountdown: boolean;
};
type Props = {
  options: GameOptions;
  difficulty: GameDifficulty;
  optionsChangeHandler: (options: GameOptions) => void;
  difficultyChangeHandler: (difficulty: GameDifficulty) => void;
};
export default function GameOptionsForm(props: Props) {
  const { options, difficulty, optionsChangeHandler, difficultyChangeHandler } =
    props;
  const [autoDifficulty, setAutoDifficulty] = useState(true);

  const countdownHandler = () =>
    optionsChangeHandler({ ...options, withCountdown: !options.withCountdown });
  const autoDifficultyHandler = () => {
    difficultyChangeHandler(
      autoDifficulty
        ? { ...difficulty, level: undefined }
        : { ...GameDifficulties[0] },
    );

    setAutoDifficulty(!autoDifficulty);
  };

  const sliderChangeHandler = (id: string, val: number) => {
    difficultyChangeHandler({ ...difficulty, [id]: val });
  };

  const difficultyResetHandler = () =>
    difficultyChangeHandler({ ...GameDifficulties[0] });

  return (
    <div className="flex flex-col gap-4">
      <Switch
        data-cy="game-countdown-toggle"
        isSelected={options.withCountdown}
        onValueChange={countdownHandler}
      >
        Auto-play with countdown
      </Switch>

      <Switch
        data-cy="game-auto-difficulty-toggle"
        isSelected={autoDifficulty}
        onValueChange={autoDifficultyHandler}
      >
        Adapt options based on difficulty
      </Switch>

      <div>
        <Button
          data-cy="game-difficulty-reset"
          isDisabled={!autoDifficulty}
          color="secondary"
          variant="faded"
          onPress={difficultyResetHandler}
        >
          Reset difficulty
        </Button>
      </div>

      <GameOptionSlider
        id="speed"
        value={difficulty.speed}
        isDisabled={autoDifficulty}
        label="Speed (Rounds Per Second)"
        format={(v) => `${v}RPS`}
        step={0.05}
        min={0.5}
        default={1}
        max={2}
        changeHandler={sliderChangeHandler}
      />

      <GameOptionSlider
        id="size"
        value={difficulty.size}
        isDisabled={autoDifficulty}
        label="OK Size"
        format={(v) => `${v}°`}
        min={5}
        default={140}
        max={160}
        changeHandler={sliderChangeHandler}
      />

      <GameOptionSlider
        id="perfectMultiplier"
        value={difficulty.perfectMultiplier}
        isDisabled={autoDifficulty}
        label="Perfect (% of OK Size)"
        format={(v) => `${v}%`}
        min={1}
        default={50}
        max={100}
        changeHandler={sliderChangeHandler}
      />
    </div>
  );
}
