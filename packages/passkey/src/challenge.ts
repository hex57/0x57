const decoder = new TextDecoder();

/**
 * Creates a random challenge string to use to prevent replay attacks
 * @returns A string of random bytes
 */
export function getChallengeString() {
	const randomBytes = crypto.getRandomValues(new Uint8Array(32));
	return decoder.decode(randomBytes);
}
