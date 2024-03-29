"use client";

import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Film, PlaySquare } from "lucide-react";

import { BucketObject } from "@/s3";

export interface ObjectViewerProps {
	value: BucketObject;
	className?: string;
	controls?: boolean;
}

export const ObjectViewer: FC<ObjectViewerProps> = ({
	value: { type, url },
	className,
	controls = false
}) => {
	const [primaryType, secondaryType] = type.split("/");

	return (
		<div className="group relative size-full bg-neutral-950">
			{{
				image: (
					<>
						<img
							// style={{ backgroundImage: `url(${url})` }}
							className={twMerge(className, "h-full w-full")}
							src={url}
						/>
						{secondaryType === "gif" && (
							<PlaySquare className="absolute left-2 top-2 z-10 brightness-50 transition-all group-hover:brightness-75" />
						)}
					</>
				),
				video: (
					<>
						<video
							loop
							autoPlay={controls}
							className={twMerge("h-full w-full", className)}
							controls={controls}
							src={url}
							onPointerEnter={async ({ currentTarget }) => {
								if (controls) return;

								await currentTarget.play();
							}}
							onPointerLeave={({ currentTarget }) => {
								if (controls) return;

								currentTarget.pause();
								currentTarget.currentTime = 0;
							}}
						/>
						{!controls && (
							<Film className="absolute left-2 top-2 z-10 brightness-50 transition-all group-hover:brightness-75" />
						)}
					</>
				)
			}[primaryType] ?? (
					<div className={twMerge("overflow-hidden", className)}>
						<p className="p-1 font-thin">
							{decodeURI(url.split("/").pop() ?? "")}
						</p>
					</div>
				)}
		</div>
	);
};
