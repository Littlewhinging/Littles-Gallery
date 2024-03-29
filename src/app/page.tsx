import { CronologicalGallery } from "@/components/gallery";

export default async function Home({
	searchParams: { query }
}: {
	searchParams: { query?: string };
}) {
	return <CronologicalGallery query={query} />;
}
