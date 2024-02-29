import { isWebAuthnAvailable } from "@0x57/passkey";
import { useSyncExternalStore } from "react";

let isAvailable = false;

function subscribe(onStoreChange: () => void) {
	isWebAuthnAvailable()
		.then((value) => {
			isAvailable = value;
		})
		.catch(() => {
			isAvailable = false;
		})
		.finally(() => {
			onStoreChange();
		});

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	return () => {};
}

export function useWebAuthnAvailability() {
	const value = useSyncExternalStore<boolean>(
		subscribe,
		// Client Value
		() => isAvailable,
		// Server Value
		() => isAvailable
	);

	return value;
}
