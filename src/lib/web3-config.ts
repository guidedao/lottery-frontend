import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { holesky } from 'wagmi/chains';
import { http } from 'wagmi';

export const config = getDefaultConfig({
  appName: 'GuideDAO Lottery',
  projectId: '976b8d08720eac427e1f14ba17af74b6',
  chains: [holesky],
  transports: {
    [holesky.id]: http('https://ethereum-holesky-rpc.publicnode.com'),
  },
  ssr: true, // Next.js server-side rendering support
});
