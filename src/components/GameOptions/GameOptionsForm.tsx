import { Button, Switch } from "@nextui-org/react";
import GameOptionSlider from "./GameOptionSlider";
import { useGameOptions, useGameOptionsDispatch } from "./GameOptionsContext";

export default function GameOptionsForm() {
  const options = useGameOptions();
  const optionsDispatch = useGameOptionsDispatch();

  const countdownHandler = () => optionsDispatch({ type: "toggleCountdown" });
  const autoDifficultyHandler = () =>
    optionsDispatch({ type: "toggleAutoDifficulty" });
  const resetDifficultyOnFailHandler = () =>
    optionsDispatch({
      type: "toggleSimpleBoolean",
      key: "resetDifficultyOnFail",
    });
  const stopOnFailHandler = () =>
    optionsDispatch({
      type: "toggleSimpleBoolean",
      key: "stopOnFail",
    });
  const difficultyResetHandler = () =>
    optionsDispatch({ type: "resetDifficulty" });

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
        data-cy="game-stopOnFail-toggle"
        isSelected={options.stopOnFail}
        isDisabled={!options.withCountdown}
        onValueChange={stopOnFailHandler}
      >
        Stop on fail
      </Switch>

      <Switch
        data-cy="game-resetDifficultyOnFail-toggle"
        isSelected={options.resetDifficultyOnFail}
        isDisabled={!options.withAutoDifficulty}
        onValueChange={resetDifficultyOnFailHandler}
      >
        Reset difficulty on fail
      </Switch>

      <div>
        <Button
          data-cy="game-difficulty-reset"
          isDisabled={!options.withAutoDifficulty}
          color="secondary"
          variant="faded"
          onPress={difficultyResetHandler}
        >
          Reset difficulty
        </Button>
      </div>

      <Switch
        data-cy="game-autoDifficulty-toggle"
        isSelected={options.withAutoDifficulty}
        onValueChange={autoDifficultyHandler}
      >
        Adapt options based on difficulty
      </Switch>

      <GameOptionSlider
        id="speed"
        label="Speed (Rounds Per Second)"
        format={(v) => `${v}RPS`}
        step={0.05}
        min={0.5}
        default={1}
        max={2}
      />

      <GameOptionSlider
        id="okSize"
        label="OK Size"
        format={(v) => `${v}°`}
        min={5}
        default={140}
        max={160}
      />

      <GameOptionSlider
        id="perfectMultiplier"
        label="Perfect (% of OK Size)"
        format={(v) => `${v}%`}
        min={1}
        default={50}
        max={100}
      />
    </div>
  );
}
