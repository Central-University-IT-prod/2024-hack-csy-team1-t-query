import { PropsWithChildren } from "react";
import { TanstackProvider } from "./TanstackProvider";

export const MainProvider = ({ children }: PropsWithChildren) => {
	return <TanstackProvider>{children}</TanstackProvider>;
};
