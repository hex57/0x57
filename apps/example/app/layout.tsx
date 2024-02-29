import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Fragment } from "react";
import { getSession } from "../lib/session";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "0x57 Auth Example Application",
	description: "Test WebAuthn Passkeys!",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getSession();
	const isLoggedIn = session.userId != null;

	return (
		<html lang="en" className="h-full bg-white">
			<body className={clsx(inter.className, "h-full")}>
				<header className="bg-gray-800">
					<nav>
						<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
							<div className="relative flex h-16 items-center justify-between">
								<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
									<div className="flex flex-shrink-0 items-center">
										<Link href="/" className="font-extrabold text-white">
											0x57 Demo
										</Link>
									</div>

									<div className="flex space-x-4 ml-6">
										{isLoggedIn ? (
											<Fragment>
												<Link
													href="/profile"
													className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
												>
													View Profile
												</Link>
												<Link
													href="/logout"
													className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
												>
													Logout
												</Link>
											</Fragment>
										) : (
											<Fragment>
												<Link
													href="/login"
													className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
												>
													Login
												</Link>
												<Link
													href="/register"
													className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
												>
													Register
												</Link>
											</Fragment>
										)}
									</div>
								</div>
								<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
									<div className="relative ml-3">user id</div>
								</div>
							</div>
						</div>
					</nav>
				</header>

				<main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-12">
					{children}
				</main>
			</body>
		</html>
	);
}
