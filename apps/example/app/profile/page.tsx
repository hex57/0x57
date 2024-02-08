import hex57 from "@/lib/0x57";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
	const session = await getSession();

	if (!session.userId) {
		redirect("/login");
	}

	const user = await hex57.getAccount(session.userId);

	return (
		<section>
			<h1 className="text-4xl font-extrabold mb-8">User Profile Page</h1>
			<pre>{JSON.stringify(user, null, 2)}</pre>
		</section>
	);
}
