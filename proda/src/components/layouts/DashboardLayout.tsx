import { setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import toast from "react-hot-toast";
import { Container } from "../elements/Container";
import { Button } from "../ui";

export const DashboardLayout = ({ children }: PropsWithChildren) => {
	const router = useRouter();

	const logout = () => {
		setCookie("token", "");
		router.push("/");
		toast.success("Вы вышли из аккаунта");
	};

	return (
		<div className="h-full">
			<div className="h-12 bg-slate-200">
				<Container className="flex h-full items-center justify-between">
					<Link className="flex items-center gap-2" href="/dashboard">
						<Image
							src="/images/favicon.ico"
							alt="logo"
							width={32}
							height={32}
						/>
						<p className="text-2xl font-bold sm:text-center">
							<span className="text-primary">Т</span> - Очередь
						</p>
					</Link>
					<Button variant="ghost" onClick={logout}>
						Выйти
					</Button>
				</Container>
			</div>
			<Container className="pt-4">{children}</Container>
		</div>
	);
};
