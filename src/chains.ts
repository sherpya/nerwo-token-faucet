import { baseSepolia, foundry } from 'wagmi/chains';
import type { Chain } from 'viem';

const SUPPORTED_CHAINS = {
  foundry,
  baseSepolia,
} as const;

type SupportedChainKey = keyof typeof SUPPORTED_CHAINS;

const DEFAULT_CHAIN_KEY: SupportedChainKey = 'foundry';

function getSelectedChainKey(): SupportedChainKey {
  const configured = process.env.NEXT_PUBLIC_FAUCET_CHAIN;
  if (configured && configured in SUPPORTED_CHAINS) {
    return configured as SupportedChainKey;
  }

  return DEFAULT_CHAIN_KEY;
}

function getRpcUrl(chain: Chain): string | undefined {
  if (chain.id === foundry.id) {
    return process.env.NEXT_PUBLIC_FOUNDRY_RPC_URL ?? 'http://127.0.0.1:8545';
  }

  if (chain.id === baseSepolia.id) {
    return process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL ?? 'https://sepolia.base.org';
  }

  return undefined;
}

export const foundryRpcUrl = getRpcUrl(foundry) ?? 'http://127.0.0.1:8545';
export const baseSepoliaRpcUrl = getRpcUrl(baseSepolia) ?? 'https://sepolia.base.org';

export const selectedChainKey = getSelectedChainKey();
export const selectedChain = SUPPORTED_CHAINS[selectedChainKey];
export const supportedChains = [foundry, baseSepolia] as const;

export const chainMetadata: Record<SupportedChainKey, { faucetUrl: string; explorerBaseUrl: string; displayName: string; gasTokenName: string; }> = {
  foundry: {
    faucetUrl: 'https://sepoliafaucet.com/',
    explorerBaseUrl: 'http://127.0.0.1:8545',
    displayName: 'Foundry / Anvil',
    gasTokenName: 'Anvil ETH',
  },
  baseSepolia: {
    faucetUrl: 'https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet',
    explorerBaseUrl: 'https://sepolia.basescan.org',
    displayName: 'Base Sepolia',
    gasTokenName: 'Base Sepolia ETH',
  },
};
