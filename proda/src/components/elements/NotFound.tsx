import Link from "next/link";
import { Button } from "@/components/ui";

export const NotFound = () => {
	return (
		<div className="flex h-full flex-col items-center justify-center gap-4">
			<h4 className="text-muted-foreground">Ничего не нашлось...</h4>

			<Link href="/dashboard">
				<Button>Вернуться на главную</Button>
			</Link>
		</div>
	);
};
