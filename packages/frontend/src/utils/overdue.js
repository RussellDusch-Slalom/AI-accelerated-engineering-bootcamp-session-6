/**
 * Overdue utility functions for calculating and checking overdue status of todos
 */

/**
 * Parses an ISO date string to a local date (without time component)
 * @param {string} dateStr - ISO date string (YYYY-MM-DD or full ISO format)
 * @returns {Date|null} Local date at midnight, or null if invalid
 */
function parseLocalDate(dateStr) {
  if (!dateStr) return null;

  try {
    // Parse the ISO date string
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;

    // Return local date at midnight (strip time component)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  } catch (err) {
    return null;
  }
}

/**
 * Gets today's date in local timezone (midnight)
 * @param {Date} nowDate - Current date reference (defaults to today if not provided)
 * @returns {Date} Local date at midnight
 */
function getLocalToday(nowDate = new Date()) {
  return new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
}

/**
 * Determines if a todo is overdue
 * A todo is overdue if:
 * - It has a dueDate
 * - The dueDate is before today's local date
 * - It is not completed
 *
 * @param {string|null|undefined} dueDate - ISO date string or null
 * @param {Date} nowDate - Current date reference (defaults to today)
 * @returns {boolean} True if the todo is overdue, false otherwise
 */
export function isOverdue(dueDate, nowDate = new Date()) {
  // No due date means not overdue
  if (!dueDate) return false;

  const dueDateObj = parseLocalDate(dueDate);
  if (!dueDateObj) return false; // Invalid date format

  const today = getLocalToday(nowDate);

  // Overdue if dueDate is before today
  return dueDateObj < today;
}

/**
 * Calculates the number of days a todo is overdue
 * Only returns a value if the todo is actually overdue (dueDate < today)
 *
 * @param {string|null|undefined} dueDate - ISO date string or null
 * @param {Date} nowDate - Current date reference (defaults to today)
 * @returns {number|null} Number of days overdue (>= 1), or null if not overdue
 */
export function daysOverdue(dueDate, nowDate = new Date()) {
  // Check if overdue first
  if (!isOverdue(dueDate, nowDate)) return null;

  const dueDateObj = parseLocalDate(dueDate);
  if (!dueDateObj) return null;

  const today = getLocalToday(nowDate);

  // Calculate difference in milliseconds and convert to days
  const diffMs = today.getTime() - dueDateObj.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Return at least 1 day (should never be 0 if overdue is true)
  return Math.max(1, days);
}

/**
 * Formats a days overdue count into human-readable text
 * @param {number} days - Number of days overdue
 * @returns {string} Formatted string like "1 day overdue" or "5 days overdue"
 */
export function formatDaysOverdue(days) {
  if (days === null || days === undefined || days < 1) return '';
  return days === 1 ? '1 day overdue' : `${days} days overdue`;
}
