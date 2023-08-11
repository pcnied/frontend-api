export interface CreateUser {
	name: string;
	email: string;
	password: string;
}

export type User = Omit<CreateUser, 'name'>;
