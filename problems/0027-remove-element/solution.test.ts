import { describe, expect, it } from "vitest";
import { removeElement } from "./solution";

describe("removeElement", () => {
  it("empty", () => {
    expect(removeElement([], 3)).toEqual(0);
  });

  it("single-negative", () => {
    expect(removeElement([0], 3)).toEqual(1);
  });

  it("single-positive", () => {
    expect(removeElement([3], 3)).toEqual(0);
  });

  it("short", () => {
    expect(removeElement([3, 2, 2, 3], 3)).toEqual(2);
  });

  it("single-positive", () => {
    expect(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2)).toEqual(5);
  });
});
