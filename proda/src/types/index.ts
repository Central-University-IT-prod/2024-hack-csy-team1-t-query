export interface IEvent {
	id: string;
	title: string;
	start_date: Date;
	end_date: Date;
	stand: IStand[];
}

export interface IStand {
	id: string;
	title: string;
	maxDuration: Date;
	description: string;
	users: IUser[];
}

export interface IUser {
	id: string;
	login: string;
}
