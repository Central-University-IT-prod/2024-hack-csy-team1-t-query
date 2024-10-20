export interface IEvent {
	title: string;
	start_date: Date;
	end_date: Date;
	stands: IStand[];
}

export interface IStand {
	title: string;
	maxDuration: Date;
	description: string;
	users: IUser[];
}

export interface IUser {
	id: string;
	login: string;
}
