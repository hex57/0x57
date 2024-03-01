function bytesToString(bytes: Uint8Array): string {
	let str = "";

	for (const byte of bytes) {
		str += (byte & 0xff).toString(16).padStart(2, "0");
	}

	return str;
}

/**
 * Creates a random challenge string to use to prevent replay attacks
 * @returns A string of random bytes
 */
export function generateChallenge() {
	const randomBytes = crypto.getRandomValues(new Uint8Array(32));
	return bytesToString(randomBytes);
}
