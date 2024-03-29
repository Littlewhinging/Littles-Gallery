import * as React from "react";

export function withSuspense<T>(
	Component: React.FC<T>,
	options: Pick<React.SuspenseProps, "fallback">
) {
	return (props: T) => (
		<React.Suspense {...options}>
			<Component {...(props as JSX.IntrinsicAttributes & T)} />
		</React.Suspense>
	);
}
