import { expect, test } from "vitest";
import * as ULID from "../src";

test("returns valid ULID", () => {
  const currentTime = Date.now();
  const id = ULID.ulid();
  expect(id.length).toBe(26);
  // ensure that the decoded time is within 1 second of the current time
  const decodedTime = ULID.decodeTime(id);
  expect(decodedTime).toBeGreaterThan(currentTime - 1000);
  expect(decodedTime).toBeLessThan(currentTime + 1000);
});

test("ensure randomness", () => {
  const ulid = ULID.ulid();
  for (let i = 0; i < 100; i++) {
    expect(ulid).not.toBe(ULID.ulid());
  }
});

test("ensure monotonic ULID order", () => {
  const ulid = ULID.monotonic();
  const seedTime = Date.now();
  // ensure each id is lexographically greater than the previous
  const previousId = ulid(seedTime);
  for (let i = 0; i < 100; i++) {
    const id = ulid(seedTime);
    expect(id).not.toBe(previousId);
    const compareArr = [id, previousId];
    compareArr.sort();
    expect(compareArr[0]).toBe(previousId);
  }
});
