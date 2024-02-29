import { Fragment } from "react";
import { getSession } from "../lib/session";

export default async function Home() {
	const session = await getSession();

	return (
		<Fragment>
			<h1>0x57 Demo Application</h1>
			<pre>{JSON.stringify(session, null, 2)}</pre>
		</Fragment>
	);
}
