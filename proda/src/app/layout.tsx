import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_NAME } from "@/constants";
import { cn } from "@/lib/utils";
import { MainProvider } from "@/providers/MainProvider";

const tFont = localFont({
	src: [
		{
			path: "fonts/TinkoffSans-Bold.woff2",
			weight: "700"
		},
		{
			path: "fonts/TinkoffSans-Medium.woff2",
			weight: "500"
		},
		{
			path: "fonts/TinkoffSans-Regular.woff2",
			weight: "400"
		}
	]
});

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
			<body className={cn(tFont.className, "overflow-x-hidden")}>
				<MainProvider>
					<main className="h-screen">{children}</main>
				</MainProvider>
			</body>
		</html>
	);
}
