import type { Prettify } from "@0x57/interfaces";
import { createCredential } from "@0x57/passkey";

interface RegisterProps<ActionResult> {
	challenge: string;
	relyingParty: {
		id: string;
		name: string;
	};
	options?: {
		timeout?: number;
	};
	action: (data: FormData) => Promise<ActionResult>;
	onSuccess: (result: ActionResult) => void;
	onError: (error: unknown) => void;
}

export function useRegister<ActionResult>({
	challenge,
	relyingParty,
	options,
	action,
	onSuccess,
	onError,
}: Prettify<RegisterProps<ActionResult>>) {
	const register = async (user: { name: string; displayName: string }) => {
		try {
			const credential = await createCredential(
				{
					name: user.name,
					displayName: user.displayName,
				},
				relyingParty,
				challenge,
				{
					timeout: options?.timeout,
				}
			);

			const data = new FormData();
			data.set("credential", JSON.stringify(credential));

			const result = await action(data);

			onSuccess(result);
		} catch (error) {
			onError(error);
		}
	};

	return register;
}
