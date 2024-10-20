"use client";

import { useMutation } from "@tanstack/react-query";
import { getCookie, setCookie } from "cookies-next";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui";
import { authService } from "@/services/auth.service";

export default function Home() {
	const router = useRouter();

	const { mutate: authAdmin, isPending } = useMutation({
		mutationKey: ["auth test"],
		mutationFn: () =>
			authService.authTest({ username: "{{sensitive data}}", password: "{{sensitive data}}" }),
		onSuccess(data) {
			setCookie("token", data.token);
			router.push("dashboard");
			toast.success("Успешный вход");
		},
		onError(error) {
			toast.error(error.message);
		}
	});

	useEffect(() => {
		const token = getCookie("token");
		if (token) return redirect("/dashboard");
	}, [authAdmin]);

	return (
		<div className="flex h-full flex-col items-center justify-center gap-6">
			<div className="flex gap-3">
				<Image
					src="/images/logo.jpg"
					alt="logo"
					width={32}
					height={32}
				/>
				<h1 className="text-3xl font-bold">
					<span className="text-primary">Т</span> - Очередь
				</h1>
			</div>
			<Button disabled={isPending} onClick={() => authAdmin()}>
				Войти как тест админ
			</Button>
		</div>
	);
}
