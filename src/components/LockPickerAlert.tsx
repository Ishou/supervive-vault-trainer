import { LockPickerResult } from "@/components/LockPicker";
import { Alert } from "@nextui-org/react";

type Color = "success" | "danger" | "primary";
type Model = {
  color: Color;
  title: string;
  message: string;
};
type Models = Record<LockPickerResult, Model>;
const alertModels: Models = {
  perfect: {
    color: "success",
    title: "Perfect!",
    message: "... % accuracy",
  },
  ok: {
    color: "success",
    title: "OK!",
    message: "...° or ...ms from Perfect!",
  },
  fail: {
    color: "danger",
    title: "Fail!",
    message: "...° or ...ms from OK!",
  },
  start: {
    color: "primary",
    title: "GL & HF!",
    message: "Try your best!",
  },
};

export default function LockPickerAlert(props: { type: LockPickerResult }) {
  const model = alertModels[props.type];

  return (
    <Alert
      data-cy="lock-picker-result"
      variant="faded"
      color={model.color}
      title={model.title}
      description={model.message}
    />
  );
}
