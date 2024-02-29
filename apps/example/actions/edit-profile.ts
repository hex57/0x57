"use server";

import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import hex57 from "../lib/0x57";
import { getSession } from "../lib/session";

export default async function editProfile(formData: FormData) {
	const session = await getSession();
	const { userId } = session;

	if (userId != null) {
		redirect("/profile");
	}

	try {
		const result = await hex57.editProfile(userId, {
			email: formData.get("email"),
			username: formData.get("username"),
		});

		return { success: true };
	} catch (err) {
		if (isRedirectError(err)) {
			throw err;
		}

		console.error(err);
		return { error: true };
	}
}
