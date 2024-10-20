import { Metadata } from "next";
import { RegisterForm } from "@/components/features/auth/forms";

export const metadata: Metadata = {
	title: "Регистрация"
};

export default function RegisterPage() {
	return <RegisterForm />;
}
