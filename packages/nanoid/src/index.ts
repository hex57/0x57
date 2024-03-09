export const defaultAlphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-";

export function custom(size = 21, alphabet = defaultAlphabet) {
  return () => {
    let id = "";
    const bytes = new Uint8Array(size);
    crypto.getRandomValues(bytes);
    for (let i = 0; i < size; i++) {
      const byte = (bytes[i] ?? 0) % alphabet.length;
      id += alphabet[byte];
    }

    return id;
  };
}

export const nanoid = custom();
