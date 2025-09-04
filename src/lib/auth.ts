import type { NextAuthOptions, Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { createPublicClient, http } from 'viem';
import { arbitrumSepolia } from 'viem/chains';
import { parseSiweMessage, verifySiweMessage } from 'viem/siwe';

// Public client used to verify signatures (supports EOAs & ERC-1271)
const publicClient = createPublicClient({
    chain: arbitrumSepolia,
    transport: http()
});

export const authOptions: NextAuthOptions = {
    session: { strategy: 'jwt' as const },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Ethereum',
            credentials: {
                message: { label: 'Message', type: 'text' },
                signature: { label: 'Signature', type: 'text' }
            },
            async authorize(credentials, req): Promise<User | null> {
                try {
                    const message = credentials?.message as string | undefined;
                    const signature = credentials?.signature as `0x${string}` | undefined;
                    if (!message || !signature) return null;

                    // Extract CSRF token (nonce) from NextAuth cookie
                    const cookieHeader = (() => {
                        const headersUnknown = (req as { headers?: unknown } | undefined)?.headers;
                        if (!headersUnknown) return '';
                        if (
                            typeof headersUnknown === 'object' &&
                            headersUnknown !== null &&
                            'get' in headersUnknown &&
                            typeof (headersUnknown as { get: (name: string) => unknown }).get === 'function'
                        ) {
                            const v = (headersUnknown as { get: (name: string) => unknown }).get('cookie');
                            return typeof v === 'string' ? v : '';
                        }
                        const h = headersUnknown as Record<string, unknown>;
                        const v = h['cookie'];
                        if (typeof v === 'string') return v;
                        if (Array.isArray(v)) return v.join('; ');
                        return '';
                    })();
                    const csrfRaw = cookieHeader
                        .split(';')
                        .map((s: string) => s.trim())
                        .find((c: string) => c.startsWith('next-auth.csrf-token='))
                        ?.split('=')[1];
                    const csrfToken = csrfRaw ? decodeURIComponent(csrfRaw).split('|')[0] : undefined;
                    if (!csrfToken) return null;

                    // Validate SIWE message fields & signature
                    const parsed = parseSiweMessage(message);

                    const domain = (() => {
                        const url = process.env.NEXTAUTH_URL ?? '';
                        try {
                            return url ? new URL(url).host : undefined;
                        } catch {
                            return undefined;
                        }
                    })();

                    const ok = await verifySiweMessage(publicClient, {
                        address: parsed.address!,
                        domain: domain ?? parsed.domain ?? 'localhost',
                        message,
                        nonce: csrfToken,
                        signature
                    });

                    if (!ok) return null;

                    const address = parsed.address as string;
                    const user: User = { id: address } as User;
                    return user;
                } catch {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }: { session: Session; token: JWT }) {
            // Expose the address as `session.address` for convenience
            return { ...session, address: token?.sub } as Session & { address?: string };
        }
    }
};
