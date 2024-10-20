import { Metadata } from "next";
import { LoginForm } from "@/components/features/auth/forms";

export const metadata: Metadata = {
	title: "Вход"
};

export default function LoginPage() {
	return <LoginForm />;
}
