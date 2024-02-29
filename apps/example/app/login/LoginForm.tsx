"use client";

import { useLogin, useWebAuthnAvailability } from "@0x57/passkey-react";
import { redirect } from "next/navigation";
import createChallenge from "../../actions/challenge";
import loginAction from "../../actions/login";

export default function LoginForm() {
	const isAvailable = useWebAuthnAvailability();

	const { onSubmit, isPending } = useLogin({
		challenge: createChallenge,
		rpId: "localhost",
		// TODO: Look at these three and figure out something cleaner?
		action: loginAction,
		onSuccess: () => {
			redirect("/profile");
		},
		onError: (result) => {
			console.error({ result });
		},
	});

	return (
		<form className="space-y-6" onSubmit={onSubmit}>
			<div>
				<button
					type="submit"
					disabled={!isAvailable || isPending}
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
					Login
				</button>
			</div>
		</form>
	);
}
