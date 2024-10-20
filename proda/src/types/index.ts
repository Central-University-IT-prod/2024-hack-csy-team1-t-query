export interface IEvent {
	id?: string;
	title: string;
	start_date: string;
	end_date: string;
	adminId?: string;
}

export interface IStand {
	id?: string;
	title: string;
	max_duration: string;
	description: string;
	user?: IUser[];
}

export interface IUser {
	id: string;
}

export interface ITgUser extends IUser {
	telegram_login: string;
}
