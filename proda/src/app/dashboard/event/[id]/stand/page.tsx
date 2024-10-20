"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Stand } from "@/components/features/stands/Stand";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { isLogin } from "@/lib/isLogin";

export default function StandPage({ params }: { params: { id: string } }) {
	useEffect(() => {
		isLogin();
	}, []);

	return (
		<DashboardLayout>
			<Stand id={params.id} />
		</DashboardLayout>
	);
}
