"use client";

import { Check, Copy, Loader2 } from "lucide-react";
import { FC } from "react";

import { Button } from "./button";

export const CopyButton: FC<{ value: string }> = ({ value }) => {
	return (
		<Button
			className="size-4 brightness-75 hover:brightness-100"
			type="button"
			onAction={() => navigator.clipboard.writeText(value)}
		>
			<Copy className="hidden size-full group-data-[idle]/button:block" />
			<Loader2 className="hidden size-full animate-spin group-data-[pending]/button:block" />
			<Check className="hidden size-full group-data-[after-success]/button:block" />
		</Button>
	);
};
