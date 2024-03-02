import { coerce, date, nullable, object, string, type Output } from "valibot";

export const AccountSchema = object({
	id: string(),
	createdAt: coerce(date(), (value) => {
		if (typeof value === "string" || typeof value === "number") {
			return new Date(value);
		}

		return value;
	}),
	updatedAt: coerce(date(), (value) => {
		if (typeof value === "string" || typeof value === "number") {
			return new Date(value);
		}

		return value;
	}),
	workspaceId: string(),
	email: nullable(string()),
	username: nullable(string()),
});

export type Account = Output<typeof AccountSchema>;

export const CreateAccountResponseSchema = object({
	accountId: string(),
});
export type CreateAccountResponse = Output<typeof CreateAccountResponseSchema>;

export const CreateAccountSessionResponseSchema = object({
	account: AccountSchema,
});
export type CreateAccountSessionResponse = Output<
	typeof CreateAccountSessionResponseSchema
>;
