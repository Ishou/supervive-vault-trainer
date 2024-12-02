import { Alert, AlertTitle } from "@mui/material";
import { LockPickerResult } from "@/components/LockPicker/LockPicker";

type Color = "success" | "error" | "info";
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
    color: "error",
    title: "Fail!",
    message: "...° or ...ms from OK!",
  },
  start: {
    color: "info",
    title: "GL & HF!",
    message: "Try your best!",
  },
};

export default function LockPickerAlert(props: { type: LockPickerResult }) {
  const model = alertModels[props.type];

  return (
    <Alert color={model.color}>
      <AlertTitle>{model.title}</AlertTitle>
      {model.message}
    </Alert>
  );
}
