/**
 * Sanitizes input to prevent XSS attacks.
 * @param input The input to sanitize.
 * @returns The sanitized input.
 */

export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
