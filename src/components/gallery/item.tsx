"use client";
// import { Copy, Check, Loader2 } from "lucide-react";
import Link from "next/link";

import { ObjectViewer } from "../object-viewer";

import { withSuspense } from "@/hocs/suspense";
import { BucketObject } from "@/s3";

// import { useModal, ModelContent } from "../modal";
// import { Button } from "../button";

export const GalleryItem = withSuspense<BucketObject>(
	(object) => {
		return (
			<Link
				className="group size-48  w-full shrink-0 overflow-hidden rounded-md border border-neutral-700 bg-neutral-800 object-cover text-white shadow transition-all hover:border-neutral-500"
				href={`/${object.id}`}
			>
				<ObjectViewer
					className="size-full object-cover object-center transition-all focus:outline-none group-hover:object-contain"
					value={object}
				/>
			</Link>
		);
	},
	{
		fallback: null
	}
);
