import { NextRequest, NextResponse } from 'next/server';

import { decryptWithAdminPriv } from '@/lib/xChaCha20/decrypt-cha';
import { hexToBytes } from '@/lib/xChaCha20/utils/hex';

import { type JWT, getToken } from 'next-auth/jwt';

type DecryptBody = { payloadHex: string };

function isDecryptBody(input: unknown): input is DecryptBody {
    return (
        typeof input === 'object' && input !== null && typeof (input as Record<string, unknown>).payloadHex === 'string'
    );
}

function isHexLike(s: string): boolean {
    const h = s.startsWith('0x') ? s.slice(2) : s;
    return /^[0-9a-fA-F]+$/.test(h) && h.length % 2 === 0;
}

export async function POST(request: NextRequest) {
    // Auth: require SIWE-authenticated session and admin wallet
    const token = (await getToken({ req: request })) as JWT | null;
    const address = token?.sub?.toLowerCase();
    const admin = (process.env.ADMIN_WALLET ?? '').toLowerCase();

    if (!address) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!admin) return NextResponse.json({ error: 'Server not configured: ADMIN_WALLET missing' }, { status: 500 });
    if (address !== admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    // Expect JSON body: { payloadHex }
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    if (!isDecryptBody(body)) {
        return NextResponse.json({ error: 'Invalid body. Expected { payloadHex: string }' }, { status: 400 });
    }

    const { payloadHex } = body;
    if (!isHexLike(payloadHex)) {
        return NextResponse.json({ error: 'payloadHex must be valid hex' }, { status: 400 });
    }

    try {
        const bytes = hexToBytes(payloadHex);
        const message = await decryptWithAdminPriv(bytes);
        return NextResponse.json({ message });
    } catch (e: unknown) {
        const details = e instanceof Error ? e.message : String(e);
        return NextResponse.json({ error: 'Decryption failed', details }, { status: 400 });
    }
}
