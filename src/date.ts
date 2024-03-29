import ms from "ms";

/**
 * Returns the start of the interval for the given date and interval.
 * @param date The date to start the interval from.
 * @param interval The interval in milliseconds.
 */
export function startOfInterval(date: Date, interval: string): Date;
export function startOfInterval(date: Date, interval: number): Date;
export function startOfInterval(date: Date, _interval: number | string): Date {
	const interval = typeof _interval === "string" ? ms(_interval) : _interval;
	return new Date(Math.floor(date.getTime() / interval) * interval);
}
