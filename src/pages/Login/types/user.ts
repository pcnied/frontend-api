export interface CreateUser {
	name: string;
	email: string;
	password: string;
}

export interface UserLogged {
	email: string;
	password: string;
}
