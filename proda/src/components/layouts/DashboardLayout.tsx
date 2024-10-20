import Image from "next/image";
import { PropsWithChildren } from "react";

export const DashboardLayout = ({ children }: PropsWithChildren) => {
	// TODO
	// const events = useEvent()

	return (
		<div className="flex h-full">
			<div className="w-auto space-y-10 bg-slate-300 p-4 md:w-[220px]">
				<div className="flex justify-center">
					<h2 className="text-center text-xl">
						<span className="text-primary">Т</span>-Очередь
					</h2>
				</div>
				<h3>Мероприятия:</h3>
			</div>

			<div className="h-full p-4">{children}</div>
		</div>
	);
};
