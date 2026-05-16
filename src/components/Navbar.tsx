import Link from 'next/link';
import Image from 'next/image';
import { Connect } from '@/components';
import { chainMetadata, selectedChainKey } from '@/chains';

import nerwo from '@/public/nerwo.svg';

export function Navbar() {
    const tokenAddress = process.env.NEXT_PUBLIC_NERWO_TOKEN_ADDRESS;
    const explorerUrl = selectedChainKey === 'baseSepolia' && tokenAddress
        ? `${chainMetadata[selectedChainKey].explorerBaseUrl}/address/${tokenAddress}#code`
        : undefined;
    const activeChainLabel = chainMetadata[selectedChainKey].displayName;

    return (
        <nav className="px-[10%]">
            <div className="flex items-center justify-between p-4 py-8 w-full">
                <Link href="https://nerwo.xyz/">
                    <Image
                        src={nerwo}
                        alt="Nerwo"
                        width={132}
                        height={32} />
                </Link>
                <div>
                    <ul>
                        <li>
                            {explorerUrl ? (
                                <Link href={explorerUrl} target="_blank">
                                    <div className='align-middle'>View Contract</div>
                                </Link>
                            ) : (
                                <div className='align-middle'>View Contract (available on Base Sepolia)</div>
                            )}
                        </li>
                        <li>
                            <Link href="https://github.com/sherpya/nerwo-token-faucet">
                                <div>GitHub Source</div>
                            </Link>
                        </li>
                        <li>
                            <Connect />
                        </li>
                    </ul>
                </div>
                <div className="rounded-full border border-malachite-500 bg-gin px-3 py-1 text-sm font-semibold text-primary">
                    Chain: {activeChainLabel}
                </div>
            </div>
        </nav>
    );
}
