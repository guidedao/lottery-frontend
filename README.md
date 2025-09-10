# GuideDAO Lottery (Front-end)

Front-end application for the GuideDAO Lottery dApp. Built with Next.js (App Router), i18n, and Web3 via Wagmi/RainbowKit. See also the backend wiki: https://github.com/guidedao/lottery-backend/wiki

(c) GuideDAO et al.

## Tech Stack

- Next.js 15 (App Router, Turbopack in dev)
- React 19
- Tailwind CSS 4 + `@tailwindcss/postcss`
- shadcn/ui (Radix primitives)
- Wagmi + Viem
- RainbowKit
- next-globe-gen (i18n)

## Prerequisites

- Node.js 18.18+ (Node 20 LTS recommended)
- npm (project uses `package-lock.json`)

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000

Build and start production:

```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev`: Start Next.js dev server (Turbopack).
- `npm run build`: Build production bundle.
- `npm start`: Run production server.
- `npm run lint`: Run ESLint (Next core-web-vitals + TS).
- `npm run lint:fix`: Fix lint issues in `src/**/*`.
- `npm run format`: Prettier format `src/**/*`.

## Configuration

- Contract address: edit `src/config/projectConfig.ts`
  - `src/config/projectConfig.ts:1`
- Chain + RPC + WalletConnect: `src/lib/web3-config.ts`
  - Current chain: Arbitrum Sepolia (`arbitrumSepolia`)
  - RPC: `https://sepolia-rollup.arbitrum.io/rpc`
  - WalletConnect projectId is currently hardcoded for development; replace for production as needed.
- Contract ABI: `src/lib/abis/lotteryABI.ts`

## Project Structure

Main code lives in `src`:

```
src/
  _app/                            # Shared layout/page used by localized routes
    layout.tsx
    page.tsx                       # Composes Timer + Buy + State; adds Return panel (left column)
    [...catchAll]/                 # next-globe-gen helper route
    admin/
      page.tsx                     # Admin page (server-gated) with participants table
    test-decrypt-temp/             # Admin-only test UI for encrypt/decrypt
      page.tsx                     # Server-gated page (403 if not admin)
      ClientPanel.tsx              # Client UI for encryption/decryption

  app/
    (i18n)/                        # Localized routes generated via next-globe-gen
      en/
        layout.tsx
        page.tsx
        admin/
          page.tsx                 # i18n wrapper for _app/admin/page.tsx
      ru/
        layout.tsx
        page.tsx
        admin/
          page.tsx                 # i18n wrapper for _app/admin/page.tsx
    api/
      auth/[...nextauth]/route.ts  # NextAuth + SIWE route
      admin/decrypt/route.ts       # Admin-only decrypt endpoint

  blocks/                          # Visual blocks (e.g., backgrounds)

  components/
    LanguageSwitcher.tsx           # Locale switcher (next-globe-gen)
    header/
      Header.tsx                   # App header
      WalletConnectButton.tsx      # Connect button (gated by SIWE auth)
      WalletControls.tsx           # Network/account buttons
    footer/
      Footer.tsx
    Admin/
      AdminPanel.tsx               # Admin UI: lottery selector, table, decrypt view, CSV export
      CopyIconButton.tsx           # Reusable copy-to-clipboard icon button
      ExportCsvButton.tsx          # Export current table view to CSV
    Main/
      BuyTicketsTEMP.tsx           # Buy/Register with contact encryption (SIWE-gated)
      ReturnTicketsPanel.tsx       # Return tickets (separate panel, status-gated)
      LotteryStatusDisplayTEMP.tsx # Right-side state panel (status, price, last winner, etc.)
      Timer/Timer.tsx              # Header timer for registration end
    ui/                            # Reusable UI primitives (button, input, select, alert-dialog)

  config/
    projectConfig.ts               # Contract address and app constants

  hooks/
    useLotteryState.ts             # Multicall read: status, numbers, price, end time, last winner, + constants
    useParticipantStatus.ts        # Multicall read: isActualParticipant, userTicketsCount, refundAmount
    useBuyTickets.ts               # Enter / buyMoreTickets with value; invalidates cached queries
    useReturnTickets.ts            # Return tickets; invalidates cached queries
    useParticipantsMulticall.ts    # Participants table loader (current or specific lottery via { lotteryNumber })

  lib/
    abis/
      lotteryABI.ts                # Contract ABI
    auth.ts                        # NextAuth SIWE options (shared)
    utils.ts                       # Helpers (status text/color, time utils)
    web3-config.ts                 # Wagmi/RainbowKit config
    xChaCha20/
      encrypt-cha.ts               # Encrypt with admin X25519 public key
      decrypt-cha.ts               # Decrypt with admin X25519 private key
      utils/hex.ts                 # Hex helpers

  messages/                        # i18n messages (en/ru)

  providers/
    Web3Provider.tsx               # Wagmi + RainbowKit + SIWE + React Query

  styles/                          # Global styles (Tailwind 4)

  types/                           # Enums and types

  middleware.ts                    # Locale middleware (next-globe-gen)
```

## Internationalization (i18n)

- i18n engine: `next-globe-gen`
- Locales: English (`en`), Russian (`ru`) — see `i18n.config.ts`
- Middleware: `src/middleware.ts` (re-exports next-globe-gen middleware) with a matcher to ignore Next internals/static.
- Messages: `src/messages/en.json`, `src/messages/ru.json`
- Language switcher: `src/components/LanguageSwitcher.tsx`

Useful links:
- next-globe-gen: https://github.com/next-globe-gen/next-globe-gen
- Tutorial: https://lokalise.com/blog/nextjs-localization/

## Web3 Integration

- Wallet & UI: RainbowKit (`@rainbow-me/rainbowkit`)
- Client & Contracts: Wagmi + Viem
- Provider setup: `src/providers/Web3Provider.tsx`
- Network: Arbitrum Sepolia (testnet)

Key hooks:
- `useLotteryState` – reads `status`, `lotteryNumber`, `participantsCount`, `ticketPrice`, `registrationEndTime`, `lastWinner`.
- `useParticipantStatus` – checks if the connected address is a current participant.
- `useBuyTickets` – calls `enter` or `buyMoreTickets` depending on participant status; invalidates queries after success.

## Terms Signature Flow

The previous custom Wagmi message-signing flow has been replaced with RainbowKit Sign-In with Ethereum (SIWE) integrated with NextAuth.

- Provider: `src/providers/Web3Provider.tsx` wraps `RainbowKitProvider` with `RainbowKitSiweNextAuthProvider` and NextAuth's `SessionProvider`.
- Auth options (shared): `src/lib/auth.ts` exports `authOptions` (Credentials provider + callbacks).
- Auth route: `src/app/api/auth/[...nextauth]/route.ts` imports `authOptions` and exports only `GET` and `POST` handlers via `NextAuth(authOptions)` (do not export other fields from route files).
- Flow: connect wallet → RainbowKit prompts to sign a SIWE message → NextAuth creates a session → UI treats the user as authenticated.
- UI gating: `WalletConnectButton.tsx` considers the user connected only when `authenticationStatus === 'authenticated'`.
- Customization: adjust the SIWE message statement via `getSiweMessageOptions` in `Web3Provider.tsx`.

Server-side session usage:
- Import `authOptions` from `@/lib/auth` and pass it to `getServerSession(authOptions)`.
- Example: `src/_app/test-decrypt-temp/page.tsx`.

SIWE domain policy (strict):
- The server derives the expected SIWE domain strictly from `NEXTAUTH_URL` (host only). No other fallbacks are used.
- Production example: `NEXTAUTH_URL=https://lottery-frontend-jade.vercel.app`
- Development example: `NEXTAUTH_URL=http://localhost:3000`

CSRF/Nonce cookie:
- In production NextAuth sets `__Host-next-auth.csrf-token`; in development it may set `next-auth.csrf-token`.
- The server reads either of these and uses its value (before the `|`) as the SIWE nonce. If both message nonce and cookie exist but differ, verification is rejected.

Troubleshooting SIWE verification:
- Ensure `NEXTAUTH_URL` host matches the host users visit (subdomain and port must match; paths like `/en` don’t matter).
- Set `NEXTAUTH_SECRET` to a strong random string (consistent per environment).
- Confirm your wallet is on Arbitrum Sepolia (Chain ID 421614).
- If you hit “Error verifying signature”, clear site cookies and try again.


Required env (see example.env.local):
- `NEXTAUTH_URL`, `NEXTAUTH_SECRET`

## Encryption

This project includes simple x25519 + XChaCha20-Poly1305 helpers to encrypt data to the admin's public key on the client and decrypt it on the server.

- Encrypt (client): `src/lib/xChaCha20/encrypt-cha.ts`
  - Generates an ephemeral x25519 keypair and encrypts using XChaCha20-Poly1305 (AD = ephPub).
  - Output format: `ephPub(32) || nonce(24) || ciphertext(plain+16)` (returned as bytes; encode to hex in UI).
  - Uses `NEXT_PUBLIC_ADMIN_PUB_HEX` (32-byte x25519 public key in hex).
- Decrypt (server): `src/lib/xChaCha20/decrypt-cha.ts`
  - Derives the same shared secret with the admin private key and decrypts.
  - Uses `ADMIN_PRIV_HEX` (32-byte x25519 private key in hex; server only).
- Admin API: `src/app/api/admin/decrypt/route.ts`
  - POST JSON `{ payloadHex: string }` (hex string, `0x` optional).
  - Requires SIWE-authenticated session and that `token.sub` equals `ADMIN_WALLET`.
  - Returns `{ message }` or an error with proper status codes (401/403/400).
- Admin-only UI (demo): `src/_app/test-decrypt-temp/page.tsx`
  - Server-gated page (403 if not admin) that shows a client panel to encrypt and call the decrypt API.

Environment variables (see `example.env.local`):
- `NEXT_PUBLIC_ADMIN_PUB_HEX` — admin public x25519 key (client-visible, safe).
- `ADMIN_PRIV_HEX` — admin private x25519 key (server-only, keep secret!).
- `ADMIN_WALLET` — Ethereum address allowed to use admin endpoints/pages.

Security notes:
- Never expose `ADMIN_PRIV_HEX` to the client. Place it in `.env.local` (server runtime).
- `ADMIN_WALLET` check prevents non-admin users from decrypting via API/UI.

## Code Quality

Lint:
```bash
npm run lint
```

Fix:
```bash
npm run lint:fix
```

Format:
```bash
npm run format
```

## Fonts

- Agave — SIL Open Font License (OFL)
- Roboto — Apache License 2.0
- Keania One — SIL Open Font License (OFL)

## Troubleshooting

- Wrong network: Use the header button to switch to Arbitrum Sepolia.
- Wallet not connected: Click “Connect Wallet” (RainbowKit).
- RPC issues: Check `src/lib/web3-config.ts` transport settings.

## Learn More

- Next.js: https://nextjs.org/docs
- Wagmi: https://wagmi.sh/react/why
- RainbowKit: https://rainbowkit.com/docs
