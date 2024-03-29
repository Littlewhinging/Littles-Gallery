/**
 * Groups an array of items by a given predicate.
 * @param array The array to group.
 * @param predicate A function that returns the key to group by.
 */
export function groupBy<T, K extends PropertyKey>(
	array: Array<T>,
	predicate: (item: T) => K
): Record<K, Array<T>> {
	return array.reduce(
		(accumulator, item) => {
			const key = predicate(item);
			if (!accumulator[key]) accumulator[key] = [];

			accumulator[key].push(item);
			return accumulator;
		},
		{} as Record<K, Array<T>>
	);
}
