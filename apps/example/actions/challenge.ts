"use server";

import { generateChallenge } from "@0x57/passkey";
import { getSession } from "../lib/session";

export default async function createChallenge() {
	const session = await getSession();
	const challenge = generateChallenge();

	session.challenge = challenge;
	await session.save();

	return challenge;
}
