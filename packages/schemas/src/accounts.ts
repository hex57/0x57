import { date, nullable, object, string, type Output } from "valibot";

export const CreateAccountResponseSchema = object({
	accountId: string(),
});

export type CreateAccountResponse = Output<typeof CreateAccountResponseSchema>;

export const AccountSchema = object({
	id: string(),
	createdAt: date(),
	updatedAt: date(),
	workspaceId: string(),
	email: nullable(string()),
	username: nullable(string()),
});

export type Account = Output<typeof AccountSchema>;
