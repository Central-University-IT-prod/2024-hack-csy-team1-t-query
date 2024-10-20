import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { endOfDay, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import {
	Button,
	Calendar,
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
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { eventsService } from "@/services/events.service";
import { IEvent } from "@/types";

const CreateEventSchema = z.object({
	title: z.string().min(1, {
		message: ""
	}),
	start: z.date(),
	end: z.date()
});

export const CreateEventModal = () => {
	const { mutate: createEvent, isPending } = useMutation({
		mutationKey: ["create event"],
		mutationFn: ({ data }: { data: IEvent }) => eventsService.create(data),
		onSuccess(data: IEvent) {
			toast.success(`Мероприятие ${data.title}`);
			form.reset();
		},
		onError(error) {
			toast.error(error.message);
		}
	});

	const form = useForm<z.infer<typeof CreateEventSchema>>({
		resolver: zodResolver(CreateEventSchema),
		defaultValues: {
			title: ""
		}
	});

	const onSubmit = (values: z.infer<typeof CreateEventSchema>) => {
		const data = {
			title: values.title,
			start_date: format(
				endOfDay(values.start),
				"yyyy-MM-dd'T'HH:mm:ssXX"
			),
			end_date: format(endOfDay(values.end), "yyyy-MM-dd'T'HH:mm:ssXX")
		};
		createEvent({ data });
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Создать</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Новое мероприятие</DialogTitle>
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
											placeholder="It - пикник"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="start"
							render={({ field }) => (
								<FormItem className="flex items-center justify-between">
									<FormLabel>Начало</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-[240px] pl-3 text-left font-normal",
														!field.value &&
															"text-muted-foreground"
													)}
												>
													{field.value ? (
														format(
															field.value,
															"PPP"
														)
													) : (
														<span>
															Выберите дату
														</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent
											className="w-auto p-0"
											align="start"
										>
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) =>
													date < new Date() ||
													date <
														new Date("1900-01-01")
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="end"
							render={({ field }) => (
								<FormItem className="flex items-center justify-between">
									<FormLabel>Конец</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-[240px] pl-3 text-left font-normal",
														!field.value &&
															"text-muted-foreground"
													)}
												>
													{field.value ? (
														format(
															field.value,
															"PPP"
														)
													) : (
														<span>
															Выберите дату
														</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent
											className="w-auto p-0"
											align="start"
										>
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) =>
													date < new Date() ||
													date <
														new Date("1900-01-01")
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
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
