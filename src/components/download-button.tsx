"use client";
import { Download } from "lucide-react";
import { FC } from "react";

export const DownloadButton: FC<{ value: string }> = ({ value }) => {
	return (
		<a
			className="size-4 brightness-75 hover:brightness-100"
			download={value.split("/").pop()}
			href={value}
		>
			<Download className="size-full" />
		</a>
	);
};
