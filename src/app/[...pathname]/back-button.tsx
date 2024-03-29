"use client";

import { MoveLeft } from "lucide-react";
import { FC } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/button";

export const BackButton: FC = () => {
	const router = useRouter();

	return (
		<Button
			className="inline-flex items-center gap-2 brightness-90 transition-all hover:brightness-100"
			onClick={() => router.back()}
		>
			<MoveLeft className="size-4" />
			<span>Back</span>
		</Button>
	);
};
