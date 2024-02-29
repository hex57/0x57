"use server";

import { generateChallenge } from "@0x57/passkey";
import { getSession } from "../lib/session";

export default async function createChallenge() {
	const challenge = generateChallenge();

	const session = await getSession();
	session.challenge = generateChallenge();
	await session.save();

	return challenge;
}
