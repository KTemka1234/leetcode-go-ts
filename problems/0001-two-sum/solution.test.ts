import { describe, it, expect } from "vitest";
import { twoSum } from "./solution";

describe("twoSum", () => {
  it("basic", () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  it("middle", () => {
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
  });

  it("duplicates", () => {
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
  });
});
