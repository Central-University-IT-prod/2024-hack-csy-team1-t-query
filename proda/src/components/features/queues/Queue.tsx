"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui";
import { standService } from "@/services/stands.service";
import { userService } from "@/services/user.service";
import { IStand, ITgUser } from "@/types";

export const Queue = ({ user }: IStand) => {
	const [usersData, setUsersData] = useState<ITgUser[]>([]);

	const { mutate: removeUser, isPending } = useMutation({
		mutationKey: ["remove user from queue"],
		mutationFn: ({
			data
		}: {
			data: { username: string; stand_id: string };
		}) => standService.deleteUserFromStand(data.stand_id, data.username),
		onSuccess() {
			toast.success("Пользователь удален из очереди");
		},
		onError(error) {
			toast.error(error.message);
		}
	});

	const onClick = () =>
		user?.map((item) => {
			const { data: tgUser } = useQuery({
				queryKey: ["get telegram user"],
				queryFn: () => userService.getById(item.id)
			});

			if (tgUser) setUsersData((prev) => [...prev, tgUser]);
		});

	return (
		<div className="slate-200 flex flex-col rounded-xl">
			<div className="grid grid-cols-3 *:text-xl">
				<h3 className="col-span-1">ID</h3>
				<h3 className="col-span-2">Имя</h3>
			</div>
			{isPending ? (
				<Loader />
			) : (
				usersData.map((user) => (
					<div className="grid grid-cols-3" key={user.id}>
						<h4 className="col-span-1">{user.id}</h4>
						<span className="col-span-2">
							{user.telegram_login}
						</span>
						<Button
							variant="destructive"
							className="col-span-3"
							onClick={onClick}
						>
							Удалить
						</Button>
					</div>
				))
			)}
		</div>
	);
};
