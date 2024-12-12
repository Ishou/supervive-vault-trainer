import React, { useEffect } from "react";
import { Button, Kbd } from "@nextui-org/react";

export default function PlayStopTrigger(props: { toggleHandler: () => void }) {
  const { toggleHandler } = props;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "KeyE") return;
      event.preventDefault();

      toggleHandler();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleHandler]);

  return (
    <div className="flex justify-center">
      <Button
        data-cy="play-stop-trigger"
        color="primary"
        size="lg"
        onTouchEnd={toggleHandler}
      >
        Press <Kbd>E</Kbd> or Tap
      </Button>
    </div>
  );
}
