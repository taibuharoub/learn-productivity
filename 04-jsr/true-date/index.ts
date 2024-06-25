/**
 * A module providing a function to properly format dates.
 * @module
 *
 * @example
 * ```ts
 * import { trueDate } from "@tia/true-date";
 *
 * trueDate(new Date())
 * ```
 */

import { format } from "date-fns";

/**
 * @description Returns a date string in the format "yyyy-MM-dd"
 *
 * @export
 * @param {Date} d
 * @return {*}  {string}
 */
export function trueDate(d: Date): string {
  return format(d, "yyyy-MM-dd");
}
