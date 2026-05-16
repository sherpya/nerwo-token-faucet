import { createConfig, http } from 'wagmi';
import { injected, metaMask } from 'wagmi/connectors';
import { baseSepoliaRpcUrl, foundryRpcUrl, supportedChains } from './chains';
import { baseSepolia, foundry } from 'wagmi/chains';

export const config = createConfig({
  chains: supportedChains,
  connectors: [metaMask(), injected()],
  transports: {
    [foundry.id]: http(foundryRpcUrl),
    [baseSepolia.id]: http(baseSepoliaRpcUrl),
  },
  ssr: true,
});
