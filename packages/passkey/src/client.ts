/* eslint-env node */
import { Hex57, RequestMethod } from "@0x57/client";
import type { Account, Session } from "@0x57/types";
import { type Prettify } from "./interfaces.js";

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

	login(challenge: string, credential: Credential) {
		return this.request(RequestMethod.POST, `/sessions`, {
			challenge,
			credential,
		});
	}

	register(
		challenge: string,
		credential: Credential,
		accountData?: Prettify<AccountData>
	): Promise<Session> {
		return this.request(RequestMethod.POST, `/sessions`, {
			challenge,
			credential,
			username: accountData?.username,
			email: accountData?.email,
		});
	}

	async getAccount(id: string): Promise<Account> {
		return this.request(RequestMethod.GET, `/accounts/${id}`);
	}

	async editAccount(
		id: string,
		{ email, username }: { email?: string; username?: string }
	): Promise<Account> {
		return this.request(RequestMethod.PATCH, `/accounts/${id}`, {
			email,
			username,
		});
	}
}
