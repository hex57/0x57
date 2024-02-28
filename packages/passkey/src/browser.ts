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
