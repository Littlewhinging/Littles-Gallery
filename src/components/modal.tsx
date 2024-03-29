"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";

interface ModalContext {
	value: React.ReactNode;

	open: (content: React.ReactNode) => void;
	close: () => void;
}

export const ModalContext = React.createContext({} as ModalContext);

export const ModalProvider: React.FC<React.PropsWithChildren> = ({
	children
}) => {
	const [value, setValue] = React.useState<React.ReactNode>(null);
	const close = () => setValue(null);

	return (
		<ModalContext.Provider
			value={{
				value,
				open: setValue,
				close
			}}
		>
			<div
				data-visible={value === null ? undefined : ""}
				className={twMerge(
					"group/modal fixed left-0 top-0 flex h-screen w-screen items-center justify-center transition-all",
					value === null
						? "pointer-events-none opacity-0 backdrop-blur-0 backdrop-brightness-100"
						: "opacity-100 backdrop-blur backdrop-brightness-50"
				)}
				onClick={close}
			>
				<ModelContent>{value}</ModelContent>
			</div>
			{children}
		</ModalContext.Provider>
	);
};

export const ModelContent: React.FC<React.PropsWithChildren> = ({
	children
}) => {
	return (
		<div
			className="max-w-[80vw] translate-y-[50vh] scale-50 overflow-hidden rounded-md border border-neutral-600 bg-neutral-700 opacity-0 shadow transition-all group-data-[visible]/modal:translate-y-0 group-data-[visible]/modal:scale-100 group-data-[visible]/modal:opacity-100"
			onClick={(event) => {
				event.stopPropagation();
			}}
		>
			{children}
		</div>
	);
};

export function useModal() {
	return React.use(ModalContext);
}
