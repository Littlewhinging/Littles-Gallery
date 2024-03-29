"use client";

import { useEffect, useState, ComponentProps } from "react";

const defaultLocale = "en-US";

export const LocaleDate = ({
	value,
	options = {},
	...elementProps
}: ComponentProps<"span"> & {
	value: number;
	options?: Intl.DateTimeFormatOptions;
}) => {
	const [formatted, setFormatted] = useState(
		new Date(value).toLocaleString(defaultLocale, options)
	);

	useEffect(
		() =>
			setFormatted(new Date(value).toLocaleString(navigator.language, options)),
		[value, options]
	);

	return (
		<span {...elementProps} suppressHydrationWarning>
			{formatted}
		</span>
	);
};
