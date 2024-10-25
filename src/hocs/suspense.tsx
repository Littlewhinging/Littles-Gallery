import * as React from "react";

export const runtime = "edge";

export function withSuspense<T>(
	Component: React.FC<T>,
	options: Pick<React.SuspenseProps, "fallback">
) {
	const withSuspense = (props: T) => (
		<React.Suspense {...options}>
			<Component {...(props as JSX.IntrinsicAttributes & T)} />
		</React.Suspense>);

	return withSuspense;
}
