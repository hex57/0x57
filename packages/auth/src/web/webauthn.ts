import { getChallengeString } from "../shared/webauthn";

/**
 * Checks to see if the browser and OS supports WebAuthn validation
 * @returns Whether WebAuthn is available
 */
export async function isWebAuthnAvailable() {
	try {
		if (
			navigator?.credentials?.create == null ||
			navigator?.credentials?.get == null ||
			window?.PublicKeyCredential == null
		) {
			return false;
		}

		const available =
			await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
		return available;
	} catch (err) {
		return false;
	}
}

/**
 * Creates a new WebAuthn credential and converts it to a
 * JSON-compatible object
 * @param options TODO: Define
 * @returns The WebAuthn Credential
 */
export async function createCredential() {
	const credential = await navigator.credentials.create();
	return credential;
}

/**
 * Retrieves an existing WebAuthn credential and converts it to a
 * JSON-compatible object
 * @param options TODO: Define
 * @returns The WebAuthn Credential
 */
export async function getCredential() {
	const credential = await navigator.credentials.get();
	return credential;
}

/**
 * Generates a random string challenge to use with a WebAuthn Credential
 * @returns The random challenge string
 */
export function generateChallenge() {
	return getChallengeString(crypto, btoa);
}
