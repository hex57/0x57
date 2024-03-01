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

	async request<T>(
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

		const response = await fetch(
			`http://localhost:3000/api/${this.version}/${url}`,
			options
		);
		// const response = fetch(`https://www.0x57.dev/api/${this.version}/${url}`, options);

		if (response.status === 500) {
			throw new Error("0x57 Service returned a 500");
		}

		if (!response.ok) {
			await this.getErrors(response);
		}

		return response;
	}

	async getErrors(response: Response) {
		const errors = (await response.json()) as unknown;

		if (typeof errors === "object" && errors != null && "error" in errors) {
			if (typeof errors.error === "string") {
				throw new Error(`${response.status}: ${errors.error}`);
			} else if (Array.isArray(errors.error)) {
				throw new Error(`${response.status}: ${errors.error.join(", ")}`);
			}
		} else if (typeof errors === "string") {
			throw new Error(`${response.status}: ${errors}`);
		} else {
			throw new Error(`Unknown ${response.status} error encountered`);
		}
	}
}
