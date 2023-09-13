'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Connect } from './Connect';

import nerwo from '@/public/nerwo.svg';
import etherscan from '@/public/etherscan-logo-circle-light.svg';
import github from '@/public/github-mark-white.svg';

export default function Navbar() {
    const [navbar, setNavbar] = useState(false);
    return (
        <nav>
            <div>
                <Link href="https://nerwo.xyz/">
                    <Image
                        src={nerwo}
                        alt="Nerwo"
                        width={32}
                        height={32} />
                </Link>
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Nerwo Test Token Faucet</span>
                <div className="md:hidden">
                    <button className="hamburger" onClick={() => setNavbar(!navbar)}>
                        {navbar ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>
                <div className={`menu ${navbar ? 'block' : 'hidden'}`}>
                    <ul>
                        <li>
                            <Connect />
                        </li>
                        <li>
                            <Link href={`https://sepolia.etherscan.io/address/${process.env.NEXT_PUBLIC_NERWO_TOKEN_ADDRESS}`}>
                                <div className="flex gap-2">
                                    <Image
                                        className="flex flex-col h-full"
                                        src={etherscan}
                                        alt="Token contract on Etherscan"
                                        width={32}
                                        height={32} />
                                    <div className="md:hidden flex flex-col h-full">Etherscan</div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href="https://github.com/sherpya/nerwo-token-faucet">
                                <div className="flex gap-2">
                                    <Image
                                        className="flex flex-col h-full"
                                        src={github}
                                        alt="Source code on GitHub"
                                        width={32}
                                        height={28} />
                                    <div className="md:hidden flex flex-col h-full">GitHub</div>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
