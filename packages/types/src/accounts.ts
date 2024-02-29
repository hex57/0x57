export interface CreateAccountResponse {
	accountId: string;
}

export interface Account {
	id: string;
	createdAt: Date | null;
	updatedAt: Date | null;
	workspaceId: string;
	email: string | null;
	username: string | null;
}
