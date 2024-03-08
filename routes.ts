/**
 * An array of routes publicly accessible
 * These routes donot require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 *Prefix for API authentication routes
 *Routes starting with this prefix are used for API authntication purpose
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 *Authentication routes
 *authenticated users redirect to settings page
 * @type {string[]}
 */
export const authRoutes = ["/login", "/register"];

/**
 *Protectd routes
 *only authenticated users accessible
 *non-authenticated users redirect to login route
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
