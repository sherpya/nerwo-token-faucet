'use client';

import { useCallback } from 'react';
import { useWalletClient } from 'wagmi';

export function Congrats() {
    const { data: walletClient } = useWalletClient();
    const tokenAddress = process.env.NEXT_PUBLIC_NERWO_TOKEN_ADDRESS;
    const tokenDecimals = Number.parseInt(process.env.NEXT_PUBLIC_NERWO_TOKEN_DECIMALS ?? '18', 10);
    const tokenSymbol = process.env.NEXT_PUBLIC_NERWO_TOKEN_SYMBOL ?? 'USDT.n';

    const watchAsset = useCallback(async () => {
        const origin = typeof window !== 'undefined' ? window.origin : null;

        if (origin && tokenAddress) {
            try {
                await walletClient?.watchAsset({
                    type: 'ERC20',
                    options: {
                        address: tokenAddress,
                        decimals: tokenDecimals,
                        symbol: tokenSymbol,
                        image: `${origin}/USDTn.svg`
                    },
                });
            } catch {
                // Ignore wallet-side rejection/errors for this optional UX action.
            }
        }
    }, [walletClient, tokenAddress, tokenDecimals, tokenSymbol]);

    return (
        <div className="wizard-content">
            <h1 className="text-center">Congrats!</h1>
            <div className="text-center font-medium">Thank you anon, you have do it all the process.</div>
            <div className="text-center font-bold">Now you are ready to test Nerwo.</div>
            <div className="text-center">
                <button onClick={() => { void watchAsset(); }}>Add Token on Metamask</button>
            </div>
        </div>
    );
}
