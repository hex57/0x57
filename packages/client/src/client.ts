/* eslint-env node */

export enum RequestMethod {
	GET = "GET",
	POST = "POST",
	PATCH = "PATCH",
	PUT = "PUT",
	DELETE = "DELETE",
}

export class Hex57 {
	version: string;
	#key: string;

	constructor(key: string, version = "alpha") {
		this.#key = key;
		this.version = version;
	}

	set key(key: string) {
		this.#key = key;
	}

	async request(
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

		return fetch(`https://www.0x57.dev/api/${this.version}/${url}`, options);
	}
}
