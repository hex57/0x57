"use server";

import { getSession } from "@/lib/session";
import { generateChallenge } from "@0x57/auth";

export default async function createChallenge() {
	const challenge = generateChallenge();

	const session = await getSession();
	session.challenge = generateChallenge();
	await session.save();

	return challenge;
}
