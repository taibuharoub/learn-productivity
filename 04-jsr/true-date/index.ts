/**
 * A module providing a function to properly format dates.
 * @module
 *
 * @example Basic Usage
 * ```ts
 * import { trueDate } from "@tia/true-date";
 *
 * trueDate(new Date())
 * ```
 */

import { format } from "date-fns";

/**
 * Properly formats a date
 *
 * @export
 * @param {Date} d - The date input
 * @return {*}  {string} - Returns a date string in the format "yyyy-MM-dd"
 */
export function trueDate(d: Date): string {
  return format(d, "yyyy-MM-dd");
}
