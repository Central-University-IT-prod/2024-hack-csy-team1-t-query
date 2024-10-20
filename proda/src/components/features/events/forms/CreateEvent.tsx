import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DatePickerWithRange } from "@/components/elements/DateRangePicker";
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
import {
	TypeCreateEventSchema,
	createEventSchema
} from "@/schemas/events/createEvent";

export const CreateEvent = () => {
	const form = useForm<TypeCreateEventSchema>({
		resolver: zodResolver(createEventSchema),
		defaultValues: {
			title: ""
		}
	});

	const onSubmit = (data: TypeCreateEventSchema) => console.log(data);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Название</FormLabel>
							<FormControl>
								<Input placeholder="Т - пикник" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="startDate"
					render={({ field }) => (
						<FormItem>
							<FormLabel></FormLabel>
							<FormControl>
								<DatePickerWithRange />
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
	);
};
