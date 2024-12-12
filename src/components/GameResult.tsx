import { Alert } from "@nextui-org/react";

type Color = "success" | "danger" | "secondary";
type Model = {
  color: Color;
  title: string;
  message: string;
};
type Models = Record<GameResults, Model>;
const alertModels: Models = {
  perfect: {
    color: "success",
    title: "Perfect!",
    message: "6125 damage to the vault gate and a red pylon spawned.",
  },
  ok: {
    color: "success",
    title: "OK!",
    message: "3063 damage to the vault gate.",
  },
  fail: {
    color: "danger",
    title: "Fail!",
    message: "You spawned blue orbs.",
  },
  start: {
    color: "secondary",
    title: "GL & HF!",
    message: "Try your best!",
  },
};

export type GameResults = "start" | "perfect" | "ok" | "fail";

export default function GameResult(props: { result: GameResults }) {
  const { result } = props;
  const model = alertModels[result];

  return (
    <div className="min-h-24">
      <Alert
        data-cy="game-result"
        variant="faded"
        color={model.color}
        title={model.title}
        description={model.message}
      />
    </div>
  );
}
