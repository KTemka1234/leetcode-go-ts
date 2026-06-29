import { describe, expect, it } from "vitest";
import { removeDuplicatesFromSortedArray } from "./solution";

describe("removeDuplicatesFromSortedArray", () => {
  it("short", () => {
    expect(removeDuplicatesFromSortedArray([1, 1, 2])).toEqual(2);
  });

  it("long", () => {
    expect(removeDuplicatesFromSortedArray([0, 0, 1, 1, 1, 2, 2, 3, 3, 4])).toEqual(5);
  });
});
