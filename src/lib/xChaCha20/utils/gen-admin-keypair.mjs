#!/usr/bin/env node
// Generates an X25519 keypair and prints both keys in hex.
// If ADMIN_PRIV_HEX is set (64 hex chars), uses it as the private key.
// Optional flags:
//   --write   Save admin-pub.hex to the current directory
//   -h/--help Show usage

import { x25519 } from '@noble/curves/ed25519';
import { randomBytes } from 'node:crypto';
import fs from 'node:fs';

function isHex64(s) {
  return typeof s === 'string' && /^[0-9a-fA-F]{64}$/.test(s);
}

function printHelp() {
  console.log(`Usage: node utils/gen-admin-keypair.mjs [--write]

Options:
  --write    Write admin-pub.hex to CWD
  -h --help  Show this help

Env:
  ADMIN_PRIV_HEX  64 hex chars (32 bytes) to reuse as private key
`);
}

function main() {
  if (process.argv.includes('-h') || process.argv.includes('--help')) {
    printHelp();
    return;
  }
  const envPriv = process.env.ADMIN_PRIV_HEX;
  let priv;

  if (envPriv) {
    if (!isHex64(envPriv)) {
      console.error('ADMIN_PRIV_HEX must be 64 hex characters (32 bytes).');
      process.exit(1);
    }
    priv = Buffer.from(envPriv, 'hex');
  } else {
    priv = randomBytes(32);
  }

  if (priv.length !== 32) {
    console.error('Private key must be exactly 32 bytes.');
    process.exit(1);
  }

  const pub = x25519.getPublicKey(priv);

  const privHex = Buffer.from(priv).toString('hex');
  const pubHex = Buffer.from(pub).toString('hex');

  console.log(`ADMIN_PRIV_HEX=${privHex}`);
  console.log(`NEXT_PUBLIC_ADMIN_PUB_HEX=${pubHex}`);

  if (process.argv.includes('--write')) {
    try {
      fs.writeFileSync('admin-pub.hex', pubHex + '\n', 'utf8');
      console.error('Wrote admin-pub.hex to current directory');
    } catch (err) {
      console.error('Failed to write admin-pub.hex:', err);
      process.exit(1);
    }
  }
}

main();
