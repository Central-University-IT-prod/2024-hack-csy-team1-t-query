"use client";

import { useEffect } from "react";
import { Stand } from "@/components/features/stands/Stand";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { isLogin } from "@/lib/isLogin";

export default function StandPage({
	params
}: {
	params: { stand_id: string };
}) {
	useEffect(() => {
		isLogin();
	}, []);

	return (
		<DashboardLayout>
			<Stand id={params.stand_id} />
		</DashboardLayout>
	);
}
