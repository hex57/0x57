import { getSession } from "../lib/session";

export default async function Home() {
	const session = await getSession();

	return <h1>0x57 Demo Application</h1>;
}
