'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useWizard } from 'react-use-wizard';
import { useAccount, useBalance, useChainId } from 'wagmi';
import { chainMetadata, selectedChain, selectedChainKey } from '@/chains';

const MIN_ETH = BigInt(2 * 10 ** 17);

export function Balance() {
    const chainId = useChainId();
    const { address } = useAccount();
    const { data } = useBalance({
        chainId: selectedChain.id,
        address,
        query: {
            enabled: Boolean(address),
            refetchInterval: 5000,
        },
    });

    const { nextStep } = useWizard();

    useEffect(() => {
        if ((chainId === selectedChain.id) && (data && (data.value >= MIN_ETH))) {
            nextStep();
        }
    }, [chainId, data, nextStep]);

    return (
        <div className="wizard-content">
            <h1 className="text-center">You need {chainMetadata[selectedChainKey].gasTokenName} for gas</h1>
            <div className="text-center font-medium">Click the button below to open a faucet and claim test ETH.
                These tokens are used to do any kind of testing within Nerwo.</div>
            <div className="text-center font-bold">Once you have it, come back here for the final step.</div>
            <div className="text-center">
                <Link href={chainMetadata[selectedChainKey].faucetUrl} target="_blank">
                    <button>Go to Faucet</button>
                </Link>
            </div>
        </div>
    );
}
