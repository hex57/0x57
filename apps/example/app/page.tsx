import { getSession } from "@/lib/session";
import Image from "next/image";

export default async function Home() {
	const session = await getSession();

	return <h1>0x57 Demo Application</h1>;
}
