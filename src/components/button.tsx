"use client";

import { ComponentPropsWithRef, FC, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export const Button: FC<
	ComponentPropsWithRef<"button"> & {
		onAction?: () => Promise<unknown>;
		/**
		 * Duration to keep the button in a success state after a successful action, in milliseconds.
		 */
		afterSuccessDuration?: number;
	}
> = ({ onClick, onAction, afterSuccessDuration = 3000, ...props }) => {
	const [pending, setPending] = useState(false);
	const [errored, setErrored] = useState(false);
	const [completedOnce, setCompletedOnce] = useState(false);
	const [afterSuccess, setAfterSuccess] = useState(false);

	useEffect(() => {
		if (!completedOnce) return;

		const timeout = setTimeout(
			() => setAfterSuccess(false),
			afterSuccessDuration
		);

		return () => clearTimeout(timeout);
	}, [afterSuccessDuration, completedOnce]);

	// We don't want to show the success state if the button is pending or errored.
	if (afterSuccess && (pending || errored)) setAfterSuccess(false);

	const idle = !pending && !errored && !afterSuccess;

	return (
		<button
			{...props}
			aria-busy={pending || undefined}
			data-after-success={afterSuccess || undefined}
			data-completed-once={completedOnce || undefined}
			data-errored={errored || undefined}
			data-idle={idle ? "" : undefined}
			data-pending={pending || undefined}
			type="button"
			className={twMerge(
				"group/button brightness-90 hover:brightness-110 disabled:brightness-75",
				props.className
			)}
			onClick={async (event) => {
				onClick?.(event);
				if (pending || !onAction || event.defaultPrevented) return;

				setPending(true);
				await onAction()
					.then(() => {
						setCompletedOnce(true);
						setAfterSuccess(true);
						return;
					})
					.catch(() => {
						setErrored(true);
					})
					.finally(() => {
						setPending(false);
					});
			}}
		/>
	);
};
