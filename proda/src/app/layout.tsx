import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "./globals.css";
import { SITE_NAME } from "@/constants";
import { cn } from "@/lib/utils";
import { MainProvider } from "@/providers/MainProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	icons: {
		icon: "images/favicon.ico"
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body className={cn(inter.className, "overflow-x-hidden")}>
				<MainProvider>
					<main className="h-screen">{children}</main>
				</MainProvider>
			</body>
		</html>
	);
}
