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
  app/         # Main application entry point, global styles, and layout
  components/  # Reusable UI components
    footer/    # Footer-related components
    header/    # Header and navigation components
    ui/        # Shared UI elements (buttons, inputs, etc.)
  config/      # Configuration files and constants
  hooks/       # Custom React hooks
  lib/         # Utility functions and libraries
  types/       # TypeScript type definitions and interfaces
```

## Web3 Libraries

This project uses the following libraries for Web3 integration:

- [Wagmi](https://wagmi.sh/react/why) – A collection of React Hooks for Ethereum, designed for ease of use and flexibility.
- [RainbowKit](https://rainbowkit.com/docs/) – A React library for connecting Ethereum wallets with a beautiful, customizable UI.

## Learn More

To learn more about Next.js, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) – learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) – an interactive Next.js tutorial.
