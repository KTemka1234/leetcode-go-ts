import { describe, expect, it } from "vitest";
import { findTheIndexOfTheFirstOccurrenceInAString } from "./solution";
// import { findTheIndexOfTheFirstOccurrenceInAString } from "./solution";

describe("findTheIndexOfTheFirstOccurrenceInAString", () => {
  it("empty", () => {
    expect(findTheIndexOfTheFirstOccurrenceInAString("", "sad")).toEqual(-1);
  });

  it("single-negative", () => {
    expect(findTheIndexOfTheFirstOccurrenceInAString("s", "as")).toEqual(-1);
  });

  it("single-positive", () => {
    expect(findTheIndexOfTheFirstOccurrenceInAString("s", "s")).toEqual(0);
  });

  it("case1", () => {
    expect(findTheIndexOfTheFirstOccurrenceInAString("sadbutsad", "sad")).toEqual(0);
  });

  it("case2", () => {
    expect(findTheIndexOfTheFirstOccurrenceInAString("leetcode", "leeto")).toEqual(-1);
  });

  it("case3", () => {
    expect(findTheIndexOfTheFirstOccurrenceInAString("hello", "ll")).toEqual(2);
  });

  it("case4", () => {
    expect(findTheIndexOfTheFirstOccurrenceInAString("mississippi", "issip")).toEqual(4);
  });
});
