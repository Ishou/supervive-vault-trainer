import assert from "node:assert";
import { describe, it } from "node:test";
import compareRange from "./arc-compare.js";

describe("compareRange", () => {
  const cases = [
    {
      r1: [0, 20],
      r2: [5, 10],
      overlaps: true,
    },
    {
      r1: [0, 20],
      r2: [10, 25],
      overlaps: true,
    },
    {
      r1: [0, 20],
      r2: [20, 30],
      overlaps: true,
    },
    {
      r1: [0, 20],
      r2: [340, 30],
      overlaps: true,
    },
    {
      r1: [20, 50],
      r2: [340, 30],
      overlaps: true,
    },

    {
      r1: [0, 20],
      r2: [340, 0],
      overlaps: true,
    },
    {
      r1: [330, 50],
      r2: [320, 340],
      overlaps: true,
    },
    {
      r1: [330, 50],
      r2: [320, 20],
      overlaps: true,
    },
    {
      r1: [330, 50],
      r2: [320, 60],
      overlaps: true,
    },
    {
      r1: [0, 20],
      r2: [25, 30],
      overlaps: false,
    },
    {
      r1: [0, 20],
      r2: [340, 355],
      overlaps: false,
    },
    {
      r1: [330, 50],
      r2: [320, 325],
      overlaps: false,
    },
    {
      r1: [330, 50],
      r2: [60, 80],
      overlaps: false,
    },
  ];

  cases.forEach((c, i) => {
    it(`verifies case ${i + 1}`, () => {
      assert.strictEqual(
        compareRange(c.r1, c.r2),
        c.overlaps,
        `Case ${i + 1}: r1[${c.r1[0]},${c.r1[1]}] vs r2[${c.r2[0]},${c.r2[1]}]`,
      );
    });

    it(`verifies case ${i + 1} (reversed)`, () => {
      assert.strictEqual(
        compareRange(c.r2, c.r1),
        c.overlaps,
        `Case ${i + 1} (reversed): r1[${c.r2[0]},${c.r2[1]}] vs r2[${c.r1[0]},${c.r1[1]}]`,
      );
    });
  });
});
