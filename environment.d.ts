import type { Address } from 'viem';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_NERWO_TOKEN_ADDRESS?: Address;
      NEXT_PUBLIC_NERWO_TOKEN_SYMBOL?: string;
      NEXT_PUBLIC_NERWO_TOKEN_DECIMALS?: string;
      NEXT_PUBLIC_APP_URL?: string;
      NEXT_PUBLIC_FAUCET_CHAIN?: 'foundry' | 'baseSepolia';
      NEXT_PUBLIC_FOUNDRY_RPC_URL?: string;
      NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL?: string;
    }
  }
}

export { };
