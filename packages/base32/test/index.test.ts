import { expect, test } from "vitest";
import * as base32 from "../src";

test("encode", () => {
  const data = new TextEncoder().encode("Hello, World!");
  const encoded = base32.encode(data);
  expect(encoded).toBe("91JPRV3F5GG5EVVJDHJ22");
});

test("decode", () => {
  const data = new TextEncoder().encode("Hello, World!");
  const encoded = base32.encode(data);
  const decoded = base32.decode(encoded);
  expect(decoded).toEqual(data);
});

test("decode with invalid character", () => {
  expect(() => base32.decode("91JPRV3F5GG5EVVJDHJ22!")).toThrow(
    "Invalid base 32 character found in string: !"
  );
});
