import { notFound } from "next/navigation";
import { Metadata } from "next";

import { BackButton } from "./back-button";

import { getObject } from "@/s3";
import { LocaleDate } from "@/components/locale-date";
import { CopyButton } from "@/components/copy-button";
import { ObjectViewer } from "@/components/object-viewer";
import { Gallery } from "@/components/gallery";
import { DownloadButton } from "@/components/download-button";

export const runtime = "edge";

interface Parameters {
	pathname: Array<string>;
}

export async function generateMetadata({
	params
}: {
	params: Parameters;
}): Promise<Metadata> {
	const id = params.pathname.join("/");

	const object = await getObject(id);
	if (!object) notFound();

	const name = decodeURI(id.split("/").reverse()[0]);

	return {
		title: `${name} - Lilly's Gallery`,
		description: `View ${name} in Lilly's Gallery`,
		openGraph: {
			images: [
				{
					url: object.url,
					alt: name
				}
			]
		}
	};
}

export default async function GalleryImagePage({
	params: { pathname }
}: {
	params: Parameters;
}) {
	const id = pathname.join("/");

	const object = await getObject(id);
	if (!object) notFound();

	const [primaryType] = object.type.split("/");

	let classes = "overflow-hidden";
	if (primaryType !== "text" && object.type !== "application/json")
		classes = "h-[65vh] " + classes;

	return (
		<div className="flex flex-col gap-4">
			<BackButton />
			<div className="overflow-hidden rounded-md border border-neutral-700 bg-neutral-800 shadow">
				<div className={classes}>
					<ObjectViewer
						className="object-contain object-center"
						controls={true}
						value={object}
					/>
				</div>
				<div className="items-center justify-between gap-4 px-4 py-3 text-sm text-white md:max-2xl:flex">
					<div className="flex items-center gap-2">
						<span>{decodeURI(id)}</span>
						<CopyButton value={object.url} />
						<DownloadButton value={object.url} />
					</div>
					<div className="flex items-center gap-2">
						<LocaleDate
							value={object.updatedAt.getTime()}
							options={{
								month: "long",
								day: "numeric",
								year: "numeric",
								hour: "numeric",
								minute: "numeric",
								second: "numeric"
							}}
						/>
					</div>
				</div>
				{/* <div className="px-4 pb-3 text-xs text-white brightness-80">
					<code className="whitespace-pre">
						{JSON.stringify(object, null, 2)}
					</code>
				</div> */}
			</div>
			<div>
				<span>More like this</span>
				{
					<Gallery
						exclude={[id]}
						query={id.split("/").reverse()[0].split("_")[0]}
					/>
				}
			</div>
		</div>
	);
}
