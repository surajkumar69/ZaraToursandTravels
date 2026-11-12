/**
 * Temporary demo/testing switch for the full-screen 500 Internal Server Error page.
 *
 * How to disable and restore the normal website immediately:
 * 1. Change `DEMO_ERROR_PAGE_ENABLED` to `false`, OR
 * 2. Set `NEXT_PUBLIC_DEMO_ERROR_PAGE=false` in `.env.local` or deployment environment variables.
 */
export const DEMO_ERROR_PAGE_ENABLED = true;

export function isDemoErrorPageActive(): boolean {
  const envOverride = process.env.NEXT_PUBLIC_DEMO_ERROR_PAGE?.trim().toLowerCase();
  if (envOverride === "false" || envOverride === "0" || envOverride === "off") {
    return false;
  }
  if (envOverride === "true" || envOverride === "1" || envOverride === "on") {
    return true;
  }
  return DEMO_ERROR_PAGE_ENABLED;
}
