'use client';

import Link from 'next/link';
import { BaseError } from 'viem';
import { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi';

function shortAddress(address: string | undefined) {
  return address ? `0x${address.substring(3, 7)}...${address.substring(address.length - 4)}` : '';
}

export function Connect() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isPending, variables } = useConnect();
  const { disconnect } = useDisconnect();
  const [showDropdown, setShowDropdown] = useState(false);
  const availableConnectors = connectors.map((connector, index) => ({
    key: `${index}`,
    name: (connector as { name?: string }).name ?? 'Wallet',
    connector,
  }));

  const toggleDropDown = () => setShowDropdown(!showDropdown);

  return (
    <div>
      {isConnected && (
        <div className="relative">
          <button className="button-submit" onClick={toggleDropDown} type="button">
            {ensName ?? shortAddress(address)}
            <svg className="inline w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" /></svg>
          </button>
          <div className={`absolute p-2 ${showDropdown ? 'block' : 'hidden'}`}>
            <button className="rounded text-primary bg-white border hover:bg-hover dark:hover:bg-hover"
              onClick={() => { setShowDropdown(false); disconnect(); }}>
              Disconnect
            </button>
          </div>
        </div>
      )}

      {!isConnected && availableConnectors.length > 0 && (
        <div className="flex gap-2">
          {availableConnectors.map((walletConnector) => (
            <button key={walletConnector.key} onClick={() => connect({ connector: walletConnector.connector })}>
              {walletConnector.name}
              {isPending && variables?.connector && ' (connecting)'}
            </button>
          ))}
        </div>
      )}

      {!isConnected && availableConnectors.length === 0 && (
        <Link href="https://metamask.io/" target="_blank">
          <button>Install Metamask</button>
        </Link>
      )}

      {error && <div>{(error as BaseError).shortMessage}</div>}
    </div>
  );
}
