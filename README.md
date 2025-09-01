# GuideDAO Lottery (Front-end)

Full information is available in the [wiki](https://github.com/guidedao/lottery-backend/wiki).

(c) GuideDAO et al.


## Getting Started

This project is built with the following technologies:

- **Next.js 15** – The React framework for production.
- **React 19** – The latest version of the popular UI library.
- **shadcn/ui** – A set of beautifully designed UI components for React.
- **Tailwind CSS 4** – A utility-first CSS framework for rapid UI development.

To run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Code Quality

To check your code for linting errors, run:

```bash
npm run lint
```

To automatically fix linting errors:

```bash
npm run lint:fix
```

To format your code using Prettier:

```bash
npm run format
```

## Project Structure

The main source code is located in the `src` directory and organized as follows:

```
src/
  _app/        # Main application layout and page (next-globe-gen)
    layout.tsx # Root layout component
    page.tsx   # Root page component
  app/         # Next.js app directory with internationalization
    (i18n)/    # Internationalization routes
      en/      # English language pages
      ru/      # Russian language pages
  components/  # Reusable UI components
    footer/    # Footer-related components
    header/    # Header and navigation components
    ui/        # Shared UI elements (buttons, inputs, etc.)
  config/      # Configuration files and constants
  hooks/       # Custom React hooks
  lib/         # Utility functions and libraries
  messages/    # Internationalization message files
  styles/      # Global styles and CSS
  types/       # TypeScript type definitions and interfaces
  middleware.ts # Next.js middleware for routing
```

## Internationalization

This project uses [next-globe-gen](https://github.com/next-globe-gen/next-globe-gen) for internationalization (i18n). This TypeScript package makes it easy to add multi-language support to Next.js apps with automatic language routes, locale detection, and smart translations.

For a comprehensive guide on implementing Next.js localization with next-globe-gen, check out the [Lokalise tutorial](https://lokalise.com/blog/nextjs-localization/).

## Web3 Libraries

This project uses the following libraries for Web3 integration:

- [Wagmi](https://wagmi.sh/react/why) – A collection of React Hooks for Ethereum, designed for ease of use and flexibility.
- [RainbowKit](https://rainbowkit.com/docs/) – A React library for connecting Ethereum wallets with a beautiful, customizable UI.

## Fonts

This project uses the following fonts:

- **Agave**
  - License: [SIL Open Font License (OFL)](https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL) (free, commercial use allowed)  
- **Roboto**
  - License: [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) (free, commercial use allowed)  
- **Keania One**
  - License: [SIL Open Font License (OFL)](https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL) (free, commercial use allowed)  

## Learn More

To learn more about Next.js, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) – learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) – an interactive Next.js tutorial.
