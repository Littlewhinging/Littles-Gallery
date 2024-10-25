import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

import { Search } from "./search";

import type { Metadata } from "next";

import { ModalProvider } from "@/components/modal";

import "./globals.css";

export const runtime = "edge";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Lilly's Gallery",
	description: "View lilly's gallery"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<ModalProvider>
				<body
					className={twMerge(
						inter.className,
						"flex flex-col gap-8 bg-neutral-900 p-6 text-white"
					)}
				>
					<header className="grid grid-cols-2 justify-between gap-4">
						<Link href="/">
							<h1 className="text-xl font-light">Lillys Things :3</h1>
						</Link>
						<Search />
					</header>
					{children}
				</body>
			</ModalProvider>
		</html>
	);
}
