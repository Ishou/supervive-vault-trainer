"use client";

import { Button, Card, CardActions, CardContent } from "@mui/material";
import { Gauge } from "@mui/x-charts";

export default function Home() {
  return (
    <>
      <Card>
        <CardContent>
          <Gauge
            className="mx-auto"
            width={100}
            height={100}
            value={5}
            text=""
          />
        </CardContent>
        <CardActions>
          <Button>Go!</Button>
        </CardActions>
      </Card>
    </>
  );
}
