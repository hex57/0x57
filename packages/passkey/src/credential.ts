import type { Prettify } from "@0x57/interfaces";
import {
	create,
	get,
	parseCreationOptionsFromJSON,
	parseRequestOptionsFromJSON,
} from "@github/webauthn-json/browser-ponyfill";

function getChallengeValue(challenge: string | Uint8Array): Uint8Array {
	if (typeof challenge === "string") {
		return Uint8Array.from(challenge, (character) => character.charCodeAt(0));
	}

	return challenge;
}

interface CredentialOptions {
	attestation?: "direct" | "indirect" | "none";
	timeout?: number;
}

/**
 * Creates a new WebAuthn credential and converts it to a
 * JSON-compatible object
 * @param options - TODO: Define
 * @returns The WebAuthn Credential
 */
export async function createCredential(
	user: { name: string; displayName: string },
	relyingParty: { name: string; id: string },
	challenge: string | Uint8Array,
	options?: Prettify<CredentialOptions>
) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const json = parseCreationOptionsFromJSON({
		publicKey: {
			pubKeyCredParams: [{ alg: -7, type: "public-key" }],
			authenticatorSelection: {
				authenticatorAttachment: "platform",
			},
			user: {
				id: window.crypto.randomUUID(),
				name: user.name,
				displayName: user.displayName,
			},
			rp: relyingParty,
			attestation: options?.attestation ?? "direct",
			timeout: options?.timeout ?? 6000,
			challenge: getChallengeValue(challenge),
		},
	});

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return create(json);
}

/**
 * Retrieves an existing WebAuthn credential and converts it to a
 * JSON-compatible object
 * @param options - TODO: Define
 * @returns The WebAuthn Credential
 */
export async function getCredential(
	challenge: string | Uint8Array,
	relyingPartyId: string,
	options?: Prettify<CredentialOptions>
) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const json = parseRequestOptionsFromJSON({
		publicKey: {
			rpId: relyingPartyId,
			challenge: getChallengeValue(challenge),
			timeout: options?.timeout ?? 6000,
		},
	});

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return get(json);
}
