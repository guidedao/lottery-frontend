import { getDefaultConfig } from '@rainbow-me/rainbowkit';

import { http } from 'wagmi';
import { arbitrumSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'GuideDAO Lottery',
    projectId: '976b8d08720eac427e1f14ba17af74b6',
    chains: [arbitrumSepolia],
    transports: {
        [arbitrumSepolia.id]: http('https://sepolia-rollup.arbitrum.io/rpc')
    },
    ssr: true // Next.js server-side rendering support
});
