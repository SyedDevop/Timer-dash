/**
 * Determines whether something exists.
 * @param ts
 */
export function $exists<T>(ts: T[], message?: string) {
  const exists = ts.length > 0;
  const msg = message === undefined ? "No data found 1" : message;
  if (!exists) {
    throw new Error(msg);
  }
}
