// Shared hex utilities for xChaCha20 helpers

export function hexToBytes(hex: string): Uint8Array {
    const h = hex.startsWith('0x') ? hex.slice(2) : hex;
    if (!/^[0-9a-fA-F]*$/.test(h) || h.length % 2 !== 0) {
        throw new Error('Invalid hex');
    }
    const out = new Uint8Array(h.length / 2);
    for (let i = 0, j = 0; i < h.length; i += 2, j += 1) {
        out[j] = parseInt(h.slice(i, i + 2), 16);
    }
    return out;
}
