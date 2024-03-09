// Adapted from https://github.com/ulid/javascript/blob/master/lib/index.ts

// These values should NEVER change. If
// they do, we're no longer making ulids!
const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // Crockford's Base32
const ENCODING_LEN = ENCODING.length;
const TIME_MAX = 2 ** 48 - 1;
const TIME_LEN = 10;
const RANDOM_LEN = 16;

export function incrementBase32(str: string): string {
  const len = str.length;
  let done = false;
  let index = len - 1;
  let char: string | undefined;
  let newStr = "";
  while (!done) {
    char = str[index];
    if (char === undefined) {
      throw new Error("invalid string");
    }

    const charIndex = ENCODING.indexOf(char);
    if (charIndex === -1) {
      throw new Error("invalid character in string");
    }

    if (charIndex === ENCODING_LEN - 1) {
      newStr = ENCODING[0] + newStr;
      index--;
    } else {
      newStr = ENCODING[charIndex + 1] + newStr;
      done = true;
    }

    if (index < 0) {
      done = true;
    }
  }

  if (index >= 0) {
    newStr = str.slice(0, index) + newStr;
  }

  return newStr;
}

export function encodeTime(time: number, len: number): string {
  if (Number.isNaN(time)) {
    throw new Error("time must be a number");
  }

  if (time > TIME_MAX) {
    throw new Error(`time must be <= ${TIME_MAX}`);
  }

  if (time < 0) {
    throw new Error("time must be positive");
  }

  if (!Number.isInteger(time)) {
    throw new Error("time must be an integer");
  }

  let mod: number;
  let reamingTime = time;
  let str = "";
  for (let i = 0; i < len; i++) {
    mod = reamingTime % ENCODING_LEN;
    str = ENCODING[mod] + str;
    reamingTime = (reamingTime - mod) / ENCODING_LEN;
  }

  if (reamingTime !== 0) {
    throw new Error("time is too large to encode");
  }

  return str;
}

export function decodeTime(id: string): number {
  if (id.length !== TIME_LEN + RANDOM_LEN) {
    throw new Error("malformed ulid");
  }

  const time = id
    .slice(0, TIME_LEN)
    .split("")
    .reverse()
    .reduce((carry, char, index) => {
      const encodingIndex = ENCODING.indexOf(char);
      if (encodingIndex === -1) {
        throw new Error("id contains invalid characters");
      }

      return carry + encodingIndex * ENCODING_LEN ** index;
    }, 0);

  if (time > TIME_MAX) {
    throw new Error("time is too large to decode");
  }

  return time;
}

export function encodeRandom(len: number): string {
  let str = "";
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  for (let i = 0; i < len; i++) {
    const byte = bytes[i] ?? 0;
    str = ENCODING[byte % ENCODING_LEN] + str;
  }

  return str;
}

export function ulid(seedTime?: number): string {
  const time = seedTime ?? Date.now();
  const timeStr = encodeTime(time, TIME_LEN);
  const randomStr = encodeRandom(RANDOM_LEN);
  return timeStr + randomStr;
}

export function monotonic(): typeof ulid {
  let lastTime = 0;
  let lastRandom: string;

  return (seedTime?: number) => {
    const time = seedTime ?? Date.now();
    if (time <= lastTime) {
      const incrementedRandom = incrementBase32(lastRandom);
      if (incrementedRandom.length > RANDOM_LEN) {
        throw new Error("random overflow");
      }

      lastRandom = incrementedRandom;
    } else {
      lastRandom = encodeRandom(RANDOM_LEN);
      lastTime = time;
    }

    return encodeTime(time, TIME_LEN) + lastRandom;
  };
}
