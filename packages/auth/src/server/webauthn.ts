import crypto from "node:crypto";
import { getChallengeString } from "../shared/webauthn";

/**
 * Generates a random string challenge to use with a WebAuthn Credential
 * @returns The random challenge string
 */
export function generateChallenge() {
	return getChallengeString(crypto, globalThis.btoa);
}
