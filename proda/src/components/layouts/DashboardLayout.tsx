import Link from "next/link";
import { PropsWithChildren } from "react";
import { Container } from "../elements/Container";

export const DashboardLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="h-full">
			<div className="h-12 bg-slate-200">
				<Container className="flex h-full items-center">
					<Link
						href="/dashboard"
						className="text-2xl font-bold sm:text-center"
					>
						<span className="text-primary">Т</span> - Очередь
					</Link>
				</Container>
			</div>
			<Container className="pt-4">{children}</Container>
		</div>
	);
};
