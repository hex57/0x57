import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function GET() {
	const session = await getSession();
	session.destroy();
	redirect("/");
}
