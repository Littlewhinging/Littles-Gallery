"use client";

import { SearchIcon } from "lucide-react";
import { FC, useState, useEffect, useRef, useDeferredValue } from "react";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

import { Button } from "@/components/button";

export const Search: FC = () => {
	const router = useRouter();
	const [opened, setOpened] = useState(false);
	const [closing, setClosing] = useState(false);

	const [value, setValue] = useState("");
	const deferredValue = useDeferredValue(value);

	const input = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (opened) input.current?.focus();
	}, [opened]);

	useEffect(() => {
		router.push(
			deferredValue
				? `${location.pathname}?query=${deferredValue}`
				: location.pathname
		);
	}, [router, deferredValue]);

	return (
		<div className="flex w-full items-center gap-4">
			<input
				ref={input}
				type="text"
				value={value}
				className={twMerge(
					"ml-auto h-10 origin-right rounded-md border border-neutral-600 bg-neutral-700 px-4 py-2 shadow transition-all focus:outline-none",
					opened ? "w-full opacity-100" : "w-0 p-0 opacity-0"
				)}
				onChange={({ target }) => setValue(target.value)}
				onBlur={() => {
					if (closing) return;

					if (value === "") setOpened(false);
					setClosing(true);
				}}
			/>
			<Button
				className="ml-auto"
				onClick={() => {
					if (closing) {
						setClosing(false);
						return;
					}

					setOpened(true);
				}}
			>
				<SearchIcon />
			</Button>
		</div>
	);
};
