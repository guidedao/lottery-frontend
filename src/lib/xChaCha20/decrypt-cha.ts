// Decrypts raw payload bytes produced by encryptWithAdminPub.
// Input format: ephPub(32) || nonce(24) || ciphertext(plain+16).
// Uses admin private X25519 key from env `ADMIN_PRIV_HEX` (or passed explicitly).
import { x25519 } from '@noble/curves/ed25519';

import { hexToBytes } from './utils/hex';
import sodium from 'libsodium-wrappers';

function assert(condition: unknown, msg: string): asserts condition {
    if (!condition) throw new Error(msg);
}

/**
 * Decrypt payload to UTF-8 string using admin private key.
 * @param payload ephPub(32) || nonce(24) || ciphertext(plain+16)
 * @param adminPrivHex optional 64-hex private key; falls back to process.env.ADMIN_PRIV_HEX
 */
export async function decryptWithAdminPriv(payload: Uint8Array, adminPrivHex?: string): Promise<string> {
    await sodium.ready;

    assert(payload instanceof Uint8Array, 'Payload must be Uint8Array');
    assert(payload.length >= 32 + 24 + 16, 'Payload too short');

    const ephPub = payload.slice(0, 32);
    const nonce = payload.slice(32, 56);
    const ciphertext = payload.slice(56);

    const privHex = (adminPrivHex ?? process.env.ADMIN_PRIV_HEX ?? '').trim();
    assert(privHex, 'ADMIN_PRIV_HEX is not set');
    const adminPriv = hexToBytes(privHex);
    assert(adminPriv.length === 32, 'Admin private key must be 32 bytes (64 hex chars)');

    // Derive shared secret and key (must match encrypt side)
    const shared = x25519.getSharedSecret(adminPriv, ephPub);
    const key = sodium.crypto_generichash(32, shared);

    // AD must match: ephPub
    const decrypted = sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(null, ciphertext, ephPub, nonce, key);

    return new TextDecoder().decode(decrypted);
}
