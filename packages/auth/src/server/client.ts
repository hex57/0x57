import { Prettify } from "../shared/interfaces.js";

interface ClientOptions {
	rpid: string;
	origin: string;
}

enum RequestMethod {
	GET = "GET",
	POST = "POST",
	PATCH = "PATCH",
	PUT = "PUT",
	DELETE = "DELETE",
}

export class Hex57 {
	#key: string;
	#defaultRpid: string | undefined;
	#defaultOrigin: string | undefined;

	constructor(key: string, defaultOptions?: Prettify<ClientOptions>) {
		this.#key = key;
		this.#defaultRpid = defaultOptions?.rpid;
		this.#defaultOrigin = defaultOptions?.origin;
	}

	set key(key: string) {
		this.#key = key;
	}

	set rpid(rpid: string) {
		this.#defaultRpid = rpid;
	}

	set origin(origin: string) {
		this.#defaultOrigin = origin;
	}

	async #request(
		method: RequestMethod,
		url: string,
		body?: Record<string, unknown>
	) {
		const options: RequestInit = {
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": this.#key,
			},
			method,
		};

		if (body != null) {
			options.body = JSON.stringify(body);
		}

		return fetch(`https://www.0x57.dev/api/alpha/${url}`, options);
	}

	login() {
		// .login({
		// 	challenge,
		// 	credential: JSON.parse(formData.get("credential")?.toString() ?? ""),
		// });
	}

	register() {
		// hex57.register({
		// 	challenge,
		// 	username: formData.get("username"),
		// 	email: formData.get("email"),
		// 	credential: formData.get("credential"),
		// });
	}

	async getAccount(id: string) {
		return this.#request(RequestMethod.GET, `/accounts/${id}`);
	}

	async editAccount(
		id: string,
		{ email, username }: { email?: string; username?: string }
	) {
		return this.#request(RequestMethod.PATCH, `/accounts/${id}`, {
			email,
			username,
		});
	}
}
