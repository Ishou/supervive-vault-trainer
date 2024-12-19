import { useEffect } from "react";
import { Button, Kbd } from "@nextui-org/react";
import { useGameDispatch } from "./GameOptions/GameContext";

export default function PlayStopTrigger() {
  const gameDispatch = useGameDispatch();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "KeyE") return;
      event.preventDefault();

      gameDispatch({ type: "pressOrTap" });
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [gameDispatch]);

  return (
    <div className="flex justify-center">
      <Button
        data-cy="play-stop-trigger"
        color="primary"
        size="lg"
        onTouchEnd={() => gameDispatch({ type: "pressOrTap" })}
      >
        Press <Kbd>E</Kbd> or Tap
      </Button>
    </div>
  );
}
