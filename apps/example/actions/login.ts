"use server";

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";
import hex57 from "@/lib/0x57";

export default async function login(formData: FormData) {
	const session = await getSession();
	const { userId, challenge } = session;

	if (userId != null) {
		redirect("/profile");
	}

	if (challenge == null) {
		return { error: "Invalid credentials - please refresh and try again." };
	}

	try {
		const result = await hex57.login({
			challenge,
			credential: JSON.parse(formData.get("credential")?.toString() ?? ""),
		});

		session.userId = result.user.id;
		await session.save();
		redirect("/dashboard");
	} catch (err) {
		if (isRedirectError(err)) {
			throw err;
		}

		console.error(err);
		return { error: true };
	}
}
