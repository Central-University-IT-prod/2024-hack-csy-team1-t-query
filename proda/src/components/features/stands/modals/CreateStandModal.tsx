import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Textarea
} from "@/components/ui";
import { standService } from "@/services/stands.service";
import { IStand } from "@/types";

const CreateStandSchema = z.object({
	title: z.string().min(1, {
		message: ""
	}),
	maxDuration: z.string(),
	description: z
		.string({
			required_error: ""
		})
		.min(4, {
			message: "Минимальная длина 4 символа"
		})
});

export const CreateStandModal = () => {
	const { mutate: createStand, isPending } = useMutation({
		mutationKey: ["create stand"],
		mutationFn: ({ data }: { data: IStand }) => standService.create(data),
		onSuccess(data: IStand) {
			toast.success(`Стенд ${data.title} создан`);
			form.reset();
		},
		onError(error) {
			toast.error(error.message);
		}
	});

	const form = useForm<z.infer<typeof CreateStandSchema>>({
		resolver: zodResolver(CreateStandSchema)
	});

	const onSubmit = (values: z.infer<typeof CreateStandSchema>) => {
		const data = {
			title: values.title,
			max_duration: values.maxDuration,
			description: values.description
		};
		createStand({ data });

		console.log(data);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Создать</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Новый стенд</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-4 py-4"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem className="flex items-center justify-between">
									<FormLabel>Название</FormLabel>
									<FormControl>
										<Input
											className="w-[240px] pl-3 text-left font-normal"
											placeholder="Спорт прога"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="maxDuration"
							render={({ field }) => (
								<FormItem className="flex items-center justify-between">
									<FormLabel>Время на прохождение</FormLabel>
									<FormControl>
										<Input
											className="w-[240px] pl-3 text-left font-normal"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Описание</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Опишите свой стенд"
											className="resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" disabled={isPending}>
							Сохранить
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
