// Adapted from https://github.com/devbanana/crockford-base32/blob/develop/src/index.ts

const alphabet = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

export function encode(data: Uint8Array): string {
  const input = Uint8Array.from(data); // Copy the input buffer to avoid modifying it
  const output: number[] = [];
  let bitsRead = 0;
  let buffer = 0;

  for (const byte of input) {
    // Add current byte to start of buffer
    buffer = (buffer << 8) | byte;
    bitsRead += 8;

    while (bitsRead >= 5) {
      output.push((buffer >>> (bitsRead - 5)) & 0x1f);
      bitsRead -= 5;
    }
  }

  if (bitsRead > 0) {
    output.push((buffer << (5 - bitsRead)) & 0x1f);
  }

  return output.map((byte) => alphabet.charAt(byte)).join("");
}

export function decode(data: string): Uint8Array {
  // 1. Translate input to all uppercase
  // 2. Translate I, L, and O to valid base 32 characters
  // 3. Remove all hyphens
  let input = data;
  input = input
    .toUpperCase()
    .replace(/O/g, "0")
    .replace(/[IL]/g, "1")
    .replace(/-+/g, "");

  const output: number[] = [];
  let bitsRead = 0;
  let buffer = 0;

  for (const character of input) {
    const byte = alphabet.indexOf(character);
    if (byte === -1) {
      throw new Error(
        `Invalid base 32 character found in string: ${character}`
      );
    }

    bitsRead += 5;

    if (bitsRead >= 8) {
      bitsRead -= 8;
      output.push(buffer | (byte >> bitsRead));
      buffer = (byte << (8 - bitsRead)) & 0xff;
    } else {
      buffer |= byte << (8 - bitsRead);
    }
  }

  if (buffer > 0) {
    output.push(buffer);
  }

  return Uint8Array.from(output);
}
