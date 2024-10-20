"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { api } from "@/api/instance";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui";
import { authService } from "@/services/auth.service";

export const AuthWrapper = ({ children }: PropsWithChildren) => {
	const pathname = usePathname();
	const isLoginForm = pathname.includes("login");

	const { data: key, isPending } = useMutation({
		mutationKey: ["auth test"],
		mutationFn: () =>
			authService.authTest({ username: "admin", password: "admin" }),
		onSuccess(data) {
			console.log(data);
		},
		onError(error) {
			console.log(error);
		}
	});

	const onTestClick = () => {
		key;
	};

	return (
		<div className="flex h-full items-center justify-center p-4 sm:p-0">
			<Card className="w-full sm:w-[420px]">
				<CardHeader className="flex items-center justify-center">
					<div className="flex items-center justify-center gap-4">
						<CardTitle className="text-3xl">
							<span className="text-primary">Т</span> - Очередь
						</CardTitle>
						<Image
							src="/images/logo.jpg"
							alt="logo"
							width={32}
							height={32}
						/>
					</div>
					<CardDescription>Кабинет администратора</CardDescription>
				</CardHeader>
				<CardContent>{children}</CardContent>
				<CardFooter className="flex flex-col gap-2">
					<Link
						href={isLoginForm ? "register" : "login"}
						className="text-sky-700 hover:underline"
					>
						{isLoginForm ? "Регистрация" : "Вход"}
					</Link>
					{isLoginForm && (
						<>
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<span className="w-full border-t" />
								</div>
								<div className="relative flex items-center justify-center">
									<span className="bg-background text-muted-foreground">
										Или
									</span>
								</div>
							</div>

							<Button type="button" onClick={onTestClick}>
								Войти как тест админ
							</Button>
						</>
					)}
				</CardFooter>
			</Card>
		</div>
	);
};
