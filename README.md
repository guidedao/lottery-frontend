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
  _app/            # Shared layout/page used by localized routes
    layout.tsx
    page.tsx
  app/
    (i18n)/        # Localized routes generated via next-globe-gen
      en/
        layout.tsx
        page.tsx
      ru/
        layout.tsx
        page.tsx
  blocks/          # Visual blocks (e.g., backgrounds)
  components/
    header/        # Header, wallet connect
    footer/
    Main/          # Lottery UI (TEMP components)
    ui/            # Reusable UI primitives (button, input, select)
  config/          # Project-level config (e.g., contract address)
  hooks/           # React query + wagmi hooks (state, buy, participant)
  lib/             # utils, ABIs, web3 config
  messages/        # i18n messages (en/ru)
  providers/       # Web3Provider (Wagmi + RainbowKit + React Query)
  styles/          # Global styles (Tailwind 4)
  types/           # Enums and types
  middleware.ts    # Locale middleware (next-globe-gen)
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
