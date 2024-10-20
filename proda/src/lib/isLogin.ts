import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";

export const isLogin = () => {
	const token = getCookie("token");
	if (!token) return redirect("/");
};
