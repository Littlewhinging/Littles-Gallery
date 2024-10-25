import { LocaleDate } from "../locale-date";

import { GalleryItem } from "./item";

import { listObjects } from "@/s3";
import { withSuspense } from "@/hocs/suspense";
import { groupBy } from "@/array";
import { startOfInterval } from "@/date";

export const runtime = "edge";

export const Gallery = withSuspense<{
	query?: string;
	exclude?: Array<string>;
}>(
	async ({ query, exclude = [] }) => {
		const allObjects = await listObjects();

		const objects = (
			query
				? allObjects.filter(({ id }) =>
					id.toLowerCase().includes(query.toLowerCase())
				)
				: allObjects
		).filter(({ id }) => !exclude.includes(id));

		return (
			<div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8">
				{objects.map((object) => (
					<GalleryItem {...object} key={object.id} />
				))}
			</div>
		);
	},
	{
		fallback: (
			<div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8">
				{Array.from({ length: 16 }).map((_, index) => (
					<div
						className="aspect-square size-48 w-full shrink-0 animate-pulse rounded-md border  border-neutral-700 bg-neutral-800 object-cover text-white shadow transition-all hover:object-contain"
						key={index}
					/>
				))}
			</div>
		)
	}
);

export const CronologicalGallery = withSuspense<{ query?: string }>(
	async ({ query }) => {
		const allObjects = await listObjects();

		const objects = groupBy(
			query
				? allObjects.filter(({ id }) =>
					id.toLowerCase().includes(query.toLowerCase())
				)
				: allObjects,
			({ updatedAt }) => startOfInterval(updatedAt, "1d").getTime()
		);

		return (
			<div className="flex flex-col gap-8">
				{Object.entries(objects).map(([interval, objects]) => {
					const date = new Date(Number.parseInt(interval));

					return (
						<div className="flex flex-col gap-4" key={interval}>
							<LocaleDate
								className="text-lg font-bold"
								value={date.getTime()}
								options={{
									month: "long",
									day: "numeric",
									year: "numeric"
								}}
							/>
							<div className="flex h-fit gap-4">
								<div className="rounded-full border-l-4 border-pink-500 shadow" />
								<div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8">
									{objects.map((object) => (
										<GalleryItem {...object} key={object.id} />
									))}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	},
	{
		fallback: (
			<div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8">
				{Array.from({ length: 16 }).map((_, index) => (
					<div
						className="aspect-square size-48 w-full shrink-0 animate-pulse rounded-md border  border-neutral-700 bg-neutral-800 object-cover text-white shadow transition-all hover:object-contain"
						key={index}
					/>
				))}
			</div>
		)
	}
);
