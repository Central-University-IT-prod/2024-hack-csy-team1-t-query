"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthWrapper } from "../AuthWrapper";
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from "@/components/ui";
import { TypeRegisterSchema, registerSchema } from "@/schemas/auth/register";

export const RegisterForm = () => {
	const form = useForm<TypeRegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			passwordRepeat: ""
		}
	});

	const onSubmit = (data: TypeRegisterSchema) => console.log(data);

	return (
		<AuthWrapper>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-3"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Имя</FormLabel>
								<FormControl>
									<Input placeholder="Иван" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="example@gmail.com"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Пароль</FormLabel>
								<FormControl>
									<Input placeholder="*******" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="passwordRepeat"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Повторите пароль</FormLabel>
								<FormControl>
									<Input placeholder="******" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full">
						Продолжить
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	);
};
