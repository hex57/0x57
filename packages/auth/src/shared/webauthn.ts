interface CryptoShim {
	getRandomValues: (array: Uint8Array) => Uint8Array;
}

type Base64Shim = (value: string) => string;

export function getChallengeString(
	cryptoLib: CryptoShim,
	base64Fn: Base64Shim
) {
	const randomBytes = cryptoLib.getRandomValues(new Uint8Array(32));

	let base64 = "";
	for (const value of randomBytes) {
		base64 += String.fromCodePoint(value);
	}

	base64 = base64Fn(base64);

	return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
