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
    page.tsx
    not-found.tsx
    [...catchAll]/page.tsx         # next-globe-gen helper route
    admin/
      page.tsx                     # Admin page (server-gated)

  app/
    (i18n)/                        # Localized routes generated via next-globe-gen
      en/
        layout.tsx
        page.tsx
        not-found.tsx
        [...catchAll]/page.tsx
        admin/
          page.tsx                 # i18n wrapper for _app/admin/page.tsx
      ru/
        layout.tsx
        page.tsx
        not-found.tsx
        [...catchAll]/page.tsx
        admin/
          page.tsx                 # i18n wrapper for _app/admin/page.tsx
    api/
      auth/[...nextauth]/route.ts  # NextAuth + SIWE
      admin/decrypt/route.ts       # Admin-only decrypt endpoint
    apple-icon.png                 # App icons
    icon.png
    favicon.ico

  components/
    header/
      Header.tsx                   # App header
      LanguageSwitcher.tsx         # Locale switcher (next-globe-gen)
      MobileMenu.tsx               # Mobile navigation drawer
      WalletConnectButton.tsx      # Connect button (SIWE-gated)
      WalletControls.tsx           # Network/account controls
    footer/
      Footer.tsx
    Admin/
      AdminPanel.tsx               # Admin UI: table, decrypt, CSV export
      CopyIconButton.tsx
      ExportCsvButton.tsx
    Main/
      Modals/
        BuyTicketsModal.tsx
        LotteryStatusModal.tsx
        ReturnTicketsModal.tsx
      Timer/
        TicketTimer.tsx
        Timer.tsx
      Widgets/
        BuyTicketsForm.tsx
        LotteryStatusPanel.tsx
        ReturnTicketsPanel.tsx
        TicketWidget.tsx
        TicketWidgets.tsx
    ui/blocks/Backgrounds/Waves/   # Background effect used by CustomBackground
      Waves.tsx
    ui/                            # Reusable UI primitives (shadcn/ui)
      alert-dialog.tsx
      button.tsx
      dialog.tsx
      input.tsx
      select.tsx
      sheet.tsx
      table.tsx

  config/
    projectConfig.ts               # Contract address and app constants

  hooks/
    useBuyTickets.ts
    useLotteryState.ts
    useParticipantStatus.ts
    useParticipantsMulticall.ts
    useReturnTickets.ts
    useWalletToasts.ts

  lib/
    abis/
      lotteryABI.ts                # Contract ABI
    auth.ts                        # NextAuth SIWE options (shared)
    utils.ts                       # Helpers
    web3-config.ts                 # Wagmi/RainbowKit config
    xChaCha20/
      decrypt-cha.ts               # Decrypt with admin X25519 private key
      encrypt-cha.ts               # Encrypt with admin X25519 public key
      utils/
        gen-admin-keypair.mjs
        hex.ts

  messages/
    en.json
    ru.json

  providers/
    Web3Provider.tsx               # Wagmi + RainbowKit + SIWE + React Query

  styles/
    globals.css

  types/
    enums.ts

  middleware.ts                    # Locale middleware (next-globe-gen)
```

## Styling (globals.css)

Dark-only theme with design tokens lives in `src/styles/globals.css`.

- Root setup:
  - Dark mode is forced via `<html class="dark">` in `src/_app/layout.tsx`.
  - `.dark { color-scheme: dark; }` enables native dark scrollbars/inputs.
- Tokens (in `.dark`):
  - `--background`, `--foreground` – page background and primary text.
  - `--card`, `--card-foreground` – solid surfaces.
  - `--input` – glassy surface color used for translucent cards.
  - `--border` – generic border color.
  - `--muted-foreground` – secondary text.
  - `--primary`, `--primary-foreground` – brand accent and its contrast text.
  - `--popover`, `--popover-foreground` – overlays/popovers.
- Tailwind mapping via `@theme inline` exposes tokens as utilities:
  - Examples: `bg-background`, `text-foreground`, `bg-card`, `border-border`, `text-muted-foreground`, `bg-input/30`, `text-primary`.
- Utilities for glass surfaces (added under `@layer utilities`):
  - `.surface-glass` → `bg-input/30 border border-border backdrop-blur-xs`.
  - `.surface-glass-md` → `bg-input/40 border border-border backdrop-blur`.
  - Use them on cards/popovers instead of repeating classes.

## Internationalization (i18n)

- i18n engine: `next-globe-gen`
- Locales: English (`en`), Russian (`ru`) — see `i18n.config.ts`
- Middleware: `src/middleware.ts` (re-exports next-globe-gen middleware) with a matcher to ignore Next internals/static.
- Messages: `src/messages/en.json`, `src/messages/ru.json`
- Language switcher: `src/components/header/LanguageSwitcher.tsx`

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

- Roboto — Apache License 2.0

## Troubleshooting

- Wrong network: Use the header button to switch to Arbitrum Sepolia.
- Wallet not connected: Click “Connect Wallet” (RainbowKit).
- RPC issues: Check `src/lib/web3-config.ts` transport settings.

## Learn More

- Next.js: https://nextjs.org/docs
- Wagmi: https://wagmi.sh/react/why
- RainbowKit: https://rainbowkit.com/docs
