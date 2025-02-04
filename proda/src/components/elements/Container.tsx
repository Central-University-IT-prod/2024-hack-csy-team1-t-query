import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface Props {
	className?: string;
}

export const Container = ({
	className,
	children
}: PropsWithChildren<Props>) => {
	return (
		<div className={cn("mx-auto max-w-[1280px] px-4", className)}>
			{children}
		</div>
	);
};
