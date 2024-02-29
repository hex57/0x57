"use server";

import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import hex57 from "../lib/0x57";
import { getSession } from "../lib/session";

export default async function register(formData: FormData) {
	const session = await getSession();
	const { userId, challenge } = session;

	if (userId != null) {
		redirect("/dashboard");
	}

	if (challenge == null) {
		return { error: "Invalid credentials - please refresh and try again." };
	}

	try {
		const credential = formData.get("credential");
		if (credential == null) {
			return { error: "Invalid credential - please refresh and try again." };
		}

		const result = await hex57.register({
			challenge,
			credential: credential.toString(),
			username: formData.get("username")?.toString(),
			email: formData.get("email")?.toString(),
		});

		session.userId = result.accountId;
		await session.save();
		redirect("/profile");
	} catch (err) {
		if (isRedirectError(err)) {
			throw err;
		}

		console.error(err);
		return { error: true };
	}
}
