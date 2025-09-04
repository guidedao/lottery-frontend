export { middleware } from 'next-globe-gen/middleware';

export const config = {
    // Matcher ignoring next internals and static assets
    // Also exclude API routes (e.g. NextAuth) to avoid JSON parsing issues
    matcher: ['/((?!api|_next|.*\\.).*)']
};
