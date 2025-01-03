"use client";

import { FC, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Film, PlaySquare } from "lucide-react";

import { BucketObject } from "@/s3";
import { getJSON, getText } from "@/app/gettext";
import Image from 'next/image'

export interface ObjectViewerProps {
	value: BucketObject;
	className?: string;
	controls?: boolean;
	title?: boolean;
}

export const ObjectViewer: FC<ObjectViewerProps> = ({
	value: { type, url },
	className,
	controls = false,
	title = false
}) => {
	const [primaryType, secondaryType] = type.split("/");

	const [text, setText] = useState("");

	useEffect(() => {
		if (primaryType === "text") void getText(url).then((a) => setText(a));
		else if (type === "application/json")
			void getJSON(url).then((a) => setText(a));
	});

	return (
		<div className="group relative size-full bg-neutral-950">
			{{
				text: (
					<div className={twMerge("overflow-hidden", className)}>
						{title && (
							<p className="p-1 text-lg font-thin">
								{decodeURI(url.split("/").pop() ?? "")}
							</p>
						)}
						<p className="whitespace-pre-wrap text-wrap break-words p-1 text-xs font-light">
							{text}
						</p>
					</div>
				),
				image: (
					<>
						<Image
							// style={{ backgroundImage: `url(${url})` }}
							className={twMerge(className, "h-full w-full")}
							src={url}
							alt="Something from my gallery"
							fill
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
			}[primaryType] ??
				(secondaryType === "json" ? (
					<div className={twMerge("overflow-hidden", className)}>
						{title && (
							<p className="p-1 text-lg font-thin">
								{decodeURI(url.split("/").pop() ?? "")}
							</p>
						)}
						<p className="whitespace-pre-wrap text-wrap break-words p-1 text-xs font-light">
							{text}
						</p>
					</div>
				) : (
					<div className={twMerge("overflow-hidden", className)}>
						<p className="p-1 text-lg font-thin">
							{decodeURI(url.split("/").pop() ?? "")}
						</p>
						<p className="p-1 text-xs font-thin">{type}</p>
					</div>
				))}
		</div>
	);
};
