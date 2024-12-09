import LockPickerOptionList from "@/components/LockPickerOptionList";
import { Button, Switch } from "@nextui-org/react";
import React, { useContext } from "react";
import {
  LockPickerContext,
  LockPickerDispatchContext,
} from "@/components/LockPickerContext";

export default function LockPickerOptionsForm() {
  const { autoDifficulty } = useContext(LockPickerContext);
  const dispatch = useContext(LockPickerDispatchContext);

  const difficultyResetHandler = () =>
    dispatch({
      type: "resetDifficulty",
    });

  return (
    <div className="col-span-2 xl:col-span-1">
      <Switch
        className="mb-4"
        isSelected={autoDifficulty}
        onValueChange={() =>
          dispatch({
            type: "toggleAutoDifficulty",
          })
        }
      >
        Adapt options based on difficulty
      </Switch>

      {!autoDifficulty ? (
        <LockPickerOptionList />
      ) : (
        <div>
          <Button
            color="secondary"
            variant="faded"
            onClick={difficultyResetHandler}
          >
            Reset difficulty
          </Button>
        </div>
      )}
    </div>
  );
}
