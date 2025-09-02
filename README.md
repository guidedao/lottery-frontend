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

Notes:
- The app expects users to connect a wallet on Arbitrum Sepolia. RainbowKit will guide network switching if needed.
- `BuyTicketsTEMP` uses a placeholder `encryptedContactDetails: '0x'`. Replace with real encryption when integrating.

## Project Structure

Main code lives in `src`:

```
src/
  _app/                      # Shared layout/page used by localized routes
    layout.tsx
    page.tsx
    [...catchAll]/           # next-globe-gen helper route
  app/
    (i18n)/                  # Localized routes generated via next-globe-gen
      en/
        layout.tsx
        page.tsx
      ru/
        layout.tsx
        page.tsx
  blocks/                    # Visual blocks (e.g., backgrounds)
  components/
    LanguageSwitcher.tsx     # Locale switcher (next-globe-gen)
    header/
      Header.tsx             # App header
      WalletConnectButton.tsx# Connect + terms dialog orchestration
      WalletControls.tsx     # Network/account buttons
      TermsDialog.tsx        # AlertDialog-based consent modal
    footer/
      Footer.tsx
    Main/                    # Lottery UI (temporary components)
    ui/                      # Reusable UI primitives (button, input, select, alert-dialog)
  config/
    projectConfig.ts         # Contract address
    termsConfig.ts           # Terms config (version, URL)
  hooks/
    useLotteryState.ts       # Lottery on-chain state
    useParticipantStatus.ts  # Participant check
    useBuyTickets.ts         # Enter / buyMoreTickets
    useTermsSignature.ts     # Off-chain terms signature
  lib/
    abis/                    # Contract ABIs
    utils.ts                 # Helpers
    web3-config.ts           # Wagmi/RainbowKit config
  messages/                  # i18n messages (en/ru)
  providers/
    Web3Provider.tsx         # Wagmi + RainbowKit + React Query
  styles/                    # Global styles (Tailwind 4)
  types/                     # Enums and types
  middleware.ts              # Locale middleware (next-globe-gen)
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

- Flow: connect wallet first → a modal prompts to sign Terms → if declined or the signature fails, the wallet disconnects.
- Storage: acceptance is saved in `localStorage` per address and version; bump `TERMS_VERSION` to force re-consent.

Note: This is an off-chain consent. 

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
