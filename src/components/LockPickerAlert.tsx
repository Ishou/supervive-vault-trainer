import { LockPickerResult } from "@/components/LockPicker/LockPicker";
import { Card, CardBody } from "@nextui-org/react";

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
    <Card
      shadow="none"
      className={
        model.color === "success"
          ? `!bg-success text-success-foreground`
          : model.color === "error"
            ? `!bg-danger text-danger-foreground`
            : `!bg-primary text-primary-foreground`
      }
      role="alert"
    >
      <CardBody>
        <div className="font-bold">{model.title}</div>
        {model.message}
      </CardBody>
    </Card>
  );
}
