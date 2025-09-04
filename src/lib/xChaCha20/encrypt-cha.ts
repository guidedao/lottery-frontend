// Encrypts an input string using admin public X25519 key from env `ADMIN_PUB_HEX`.
// Produces raw payload bytes: ephPub(32) || nonce(24) || ciphertext(plain+16).
import { x25519 } from '@noble/curves/ed25519';

import { hexToBytes } from './utils/hex';
import sodium from 'libsodium-wrappers';

function assert(condition: unknown, msg: string): asserts condition {
    if (!condition) throw new Error(msg);
}

/**
 * Encrypt message using admin X25519 public key from env `ADMIN_PUB_HEX` or provided hex.
 * Returns raw bytes: ephPub || nonce || ciphertext.
 */
export async function encryptWithAdminPub(message: string, adminPubHex?: string): Promise<Uint8Array> {
    await sodium.ready;

    const pubHex = (adminPubHex ?? process.env.NEXT_PUBLIC_ADMIN_PUB_HEX ?? '').trim();
    assert(pubHex, 'NEXT_PUBLIC_ADMIN_PUB_HEX is not set');
    const adminPub = hexToBytes(pubHex);
    assert(adminPub.length === 32, 'Admin public key must be 32 bytes (64 hex chars)');

    // Ephemeral keypair
    const ephPriv = sodium.randombytes_buf(32);
    const ephPub = x25519.getPublicKey(ephPriv);
    assert(ephPub.length === 32, 'Ephemeral public key must be 32 bytes');

    // Shared secret and key derivation
    const shared = x25519.getSharedSecret(ephPriv, adminPub);
    // Derive a 32-byte key using BLAKE2b (crypto_generichash)
    const key = sodium.crypto_generichash(32, shared);

    // Nonce for XChaCha20-Poly1305 (24 bytes)
    const nonce = sodium.randombytes_buf(sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES);

    // Plaintext and AD = ephPub
    const plaintext = new TextEncoder().encode(message);
    const ad = ephPub;

    // Encrypt with XChaCha20-Poly1305 (AD = ephPub)
    const ciphertext = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(plaintext, ad, null, nonce, key);

    const out = new Uint8Array(ephPub.length + nonce.length + ciphertext.length);
    out.set(ephPub, 0);
    out.set(nonce, ephPub.length);
    out.set(ciphertext, ephPub.length + nonce.length);

    return out;
}
