import { expect, test } from "vitest";
import * as NanoID from "../src";

test("default", () => {
  const id = NanoID.nanoid();
  expect(id).toMatch(/^[0-9A-Za-z_-]{21}$/);
});

test("custom length", () => {
  const nanoid = NanoID.custom(12);
  const id = nanoid();
  expect(id.length).toBe(12);
  expect(id).toMatch(/^[0-9A-Za-z_-]{12}$/);
});

test("custom alphabet", () => {
  const nanoid = NanoID.custom(12, "abc");
  const id = nanoid();
  expect(id).toMatch(/^[abc]{12}$/);
});

test("ensure randomness", () => {
  const nanoid = NanoID.custom(12);
  const id1 = nanoid();
  const id2 = nanoid();
  expect(id1).not.toBe(id2);
});
