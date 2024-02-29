import type { Prettify } from "@0x57/interfaces";
import { getCredential } from "@0x57/passkey";
import type { FormEvent } from "react";

interface LoginProps<ActionResult> {
	challenge: string;
	relyingPartyId: string;
	options?: {
		timeout?: number;
	};
	action: (data: FormData) => Promise<ActionResult>;
	onSuccess: (result: ActionResult) => void;
	onError: (error: unknown) => void;
}

export function useLogin<ActionResult>({
	challenge,
	relyingPartyId,
	options,
	action,
	onSuccess,
	onError,
}: Prettify<LoginProps<ActionResult>>) {
	const onSubmit = async (event: FormEvent) => {
		try {
			event.preventDefault();

			const credential = await getCredential(challenge, relyingPartyId, {
				timeout: options?.timeout,
			});

			const data = new FormData();
			data.set("credential", JSON.stringify(credential));

			const result = await action(data);

			onSuccess(result);
		} catch (error) {
			onError(error);
		}
	};

	return onSubmit;
}
