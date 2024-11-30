import { LockPickerProps } from "@/components/LockPicker/LockPicker";
import { Slider, Typography } from "@mui/material";
import React from "react";

export default function LockPickerOptions(props: {
  allValues: LockPickerProps;
  changeHandler: (name: keyof LockPickerProps, value: number) => void;
}) {
  return (
    <>
      <Typography>Speed</Typography>
      <div className="mx-4">
        <Slider
          color="secondary"
          value={props.allValues.speed}
          valueLabelDisplay="auto"
          min={0.5}
          max={2}
          step={0.01}
          marks={[
            { value: 0.5, label: "0.5 RPS" },
            { value: 1, label: "1 RPS" },
            { value: 2, label: "2 RPS" },
          ]}
          onChange={(_, value) => props.changeHandler("speed", +value)}
        ></Slider>
      </div>

      <Typography>Offset</Typography>
      <div className="mx-4">
        <Slider
          color="secondary"
          value={props.allValues.offset}
          valueLabelDisplay="auto"
          max={360}
          marks={[
            { value: 0, label: "0 °" },
            { value: 360, label: "360 °" },
          ]}
          onChange={(_, value) => props.changeHandler("offset", +value)}
        ></Slider>
      </div>

      <Typography>Size</Typography>
      <div className="mx-4">
        <Slider
          color="secondary"
          value={props.allValues.size}
          valueLabelDisplay="auto"
          min={5}
          max={120}
          marks={[
            { value: 5, label: "5 °" },
            { value: 120, label: "120 °" },
          ]}
          onChange={(_, value) => props.changeHandler("size", +value)}
        ></Slider>
      </div>

      <Typography>Accuracy</Typography>
      <div className="mx-4">
        <Slider
          color="secondary"
          value={props.allValues.accuracy}
          valueLabelDisplay="auto"
          min={1}
          max={100}
          marks={[
            { value: 1, label: "1%" },
            { value: 100, label: "100%" },
          ]}
          onChange={(_, value) => props.changeHandler("accuracy", +value)}
        ></Slider>
      </div>
    </>
  );
}
