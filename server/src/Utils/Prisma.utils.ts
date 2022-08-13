/**
 * Determines whether something exists.
 * @param ts
 */
export function $exists<T>(ts: T[]) {
  const exists = ts.length > 0;
  //   return new $existsClass(exists, exists ? "" : "No data found");
  //   return { exists, messages: exists ? "" : "No data found" };
  if (!exists) {
    const err = new Error("No data found");
    throw new Error("No data found");
  }
}
