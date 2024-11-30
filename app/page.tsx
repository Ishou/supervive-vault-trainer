"use client";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import LockPicker, {
  LockPickerProps,
} from "@/components/LockPicker/LockPicker";
import React, { useCallback, useEffect, useRef, useState } from "react";
import LockPickerOptions from "@/components/LockPicker/LockPickerOptions";

const useAnimationFrame = (callback: (deltaTime: number) => void) => {
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>();

  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current != undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback],
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);
};

export default function Home() {
  const [running, setRunning] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [fps, setFps] = useState(0);
  const [allValues, setAllValues] = useState({
    speed: 1,
    offset: 0,
    size: 30,
    accuracy: 40,
  } as LockPickerProps);

  useAnimationFrame((deltaTime: number) => {
    setFps(Math.floor(1000 / deltaTime));
    if (running)
      setCursor(
        (prevCount) => prevCount + deltaTime * (0.36 * (allValues.speed || 1)),
      );
  });

  const changeHandler = (name: keyof LockPickerProps, value: number) => {
    setAllValues((prevValues) => {
      return { ...prevValues, [name]: value };
    });
  };

  const toggleRunning = () => {
    if (!running) {
      setCursor(0);
      changeHandler("offset", (300 + Math.random() * 160) % 360);
    }

    setRunning(!running);
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.code !== "KeyE") return;
    event.preventDefault();

    toggleRunning();
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="grid py-4 col-span-6 md:col-start-2 md:col-span-4">
      <Card className="my-auto">
        <CardHeader
          title={
            <Stack direction="row">
              <Typography>v0.0.0-ALPHA</Typography>
              <Box className="grow" />
              <Typography>FPS: {("" + fps).padStart(3, "0")}</Typography>
            </Stack>
          }
        />
        <Divider />
        <CardContent>
          <div className="grid grid-cols-8 gap-8 mx-8">
            <div className="col-span-4 my-auto flex flex-col">
              <Alert severity="success" variant="outlined">
                <AlertTitle>Perfect!</AlertTitle>
                x.xx % accuracy
              </Alert>
              <Alert severity="success" variant="outlined">
                <AlertTitle>OK!</AlertTitle>x ° or y ms from Perfect!
              </Alert>
              <Alert severity="error" variant="outlined">
                <AlertTitle>Fail!</AlertTitle>x ° or y ms from OK!
              </Alert>
              <Alert severity="info" variant="outlined">
                <AlertTitle>GL & HF</AlertTitle>Try your best!
              </Alert>

              <div className="mx-auto">
                <LockPicker {...allValues} cursor={cursor} />
              </div>

              <div className="mx-auto">
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  disabled
                  endIcon={
                    <Chip
                      label="E"
                      color="secondary"
                      size="small"
                      sx={{ borderRadius: "4px" }}
                    />
                  }
                >
                  Press
                </Button>
              </div>
            </div>

            <div className="col-span-4">
              <LockPickerOptions
                allValues={allValues}
                changeHandler={changeHandler}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
