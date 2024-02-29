/* eslint-env node */
import { Hex57, RequestMethod } from "@0x57/client";
import type { Prettify } from "@0x57/interfaces";
import type { Account, CreateAccountResponse } from "@0x57/types";

interface ClientOptions {
	rpid: string;
	origin: string;
	version?: string;
}

interface AccountData {
	email?: string;
	username?: string;
}

export class PasskeyClient extends Hex57 {
	defaultRpid: string | undefined;
	defaultOrigin: string | undefined;

	constructor(key: string, defaultOptions?: Prettify<ClientOptions>) {
		super(key, defaultOptions?.version);

		this.defaultRpid = defaultOptions?.rpid;
		this.defaultOrigin = defaultOptions?.origin;
	}

	async register(parameters: {
		challenge: string;
		credential: string;
		username?: string;
		email?: string;
	}): Promise<CreateAccountResponse> {
		const response = await this.request(RequestMethod.POST, `/sessions`, {
			challenge: parameters.challenge,
			credential: parameters.credential,
			username: parameters.username,
			email: parameters.email,
		});

		const json = (await response.json()) as unknown;
		return json as CreateAccountResponse;
	}

	async login(parameters: {
		challenge: string;
		credential: string;
	}): Promise<Account> {
		const response = await this.request(RequestMethod.POST, `/sessions`, {
			challenge: parameters.challenge,
			credential: parameters.credential,
		});

		const json = (await response.json()) as unknown;
		return json.account as Account;
	}

	async getAccount(id: string): Promise<Account> {
		const response = await this.request(RequestMethod.GET, `/accounts/${id}`);

		const json = (await response.json()) as unknown;
		return json.account as Account;
	}

	async editAccount(
		id: string,
		{ email, username }: { email?: string; username?: string }
	): Promise<Account> {
		const response = await this.request(
			RequestMethod.PATCH,
			`/accounts/${id}`,
			{
				email,
				username,
			}
		);

		const json = (await response.json()) as unknown;
		return json.account as Account;
	}
}
