import { getIronSession, type IronSessionData } from "iron-session";
import { cookies } from "next/headers";
import "server-only";

declare module "iron-session" {
	interface IronSessionData {
		userId?: string;
		challenge?: string;
	}
}

const sessionOptions = {
	password: process.env.SECRET_COOKIE_PASSWORD ?? "",
	cookieName: "session",
	cookieOptions: {
		secure: process.env.NODE_ENV === "production",
	},
};

export async function getSession() {
	const session = await getIronSession<IronSessionData>(
		cookies(),
		sessionOptions
	);

	return session;
}
