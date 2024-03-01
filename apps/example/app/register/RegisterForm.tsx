"use client";

import {
	useChallengeAction,
	useRegister,
	useWebAuthnAvailability,
} from "@0x57/passkey-react";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import registerAction from "../../actions/register";

export default function RegisterForm({
	createChallenge,
}: {
	createChallenge: () => Promise<string>;
}) {
	const isAvailable = useWebAuthnAvailability();
	const challenge = useChallengeAction(createChallenge);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");

	const register = useRegister({
		challenge: challenge ?? "",
		relyingParty: {
			id: "localhost",
			name: "localhost",
		},
		action: registerAction,
		onSuccess: () => {
			redirect("/profile");
		},
		onError: (result) => {
			console.error({ result });
		},
	});

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();
		register({
			name: email,
			displayName: username,
		});
	};

	return (
		<form className="space-y-6" onSubmit={onSubmit}>
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium leading-6 text-gray-900"
				>
					Email address
				</label>
				<div className="mt-2">
					<input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>

			<div>
				<label
					htmlFor="username"
					className="block text-sm font-medium leading-6 text-gray-900"
				>
					Username
				</label>
				<div className="mt-2">
					<input
						id="username"
						name="username"
						type="text"
						autoComplete="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>

			<div>
				<button
					type="submit"
					disabled={!isAvailable}
					className="inline-flex w-full items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						className="-ml-0.5 h-5 w-5"
						viewBox="0 0 16 16"
						aria-hidden="true"
					>
						<path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5" />
						<path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
					</svg>
					Register
				</button>
			</div>
		</form>
	);
}
