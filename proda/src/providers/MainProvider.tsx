import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { TanstackProvider } from "./TanstackProvider";

export const MainProvider = ({ children }: PropsWithChildren) => {
	return (
		<TanstackProvider>
			{children}
			<Toaster />
		</TanstackProvider>
	);
};
