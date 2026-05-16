'use client';

import { useEffect } from 'react';
import { useWizard } from 'react-use-wizard';
import { useChainId, useSwitchChain } from 'wagmi';
import { chainMetadata, selectedChain, selectedChainKey } from '@/chains';

export function NetworkSwitcher() {
  const chainId = useChainId();
  const { error, isPending, switchChain } = useSwitchChain();
  const { nextStep } = useWizard();

  useEffect(() => {
    if (chainId === selectedChain.id) {
      nextStep();
    }
  }, [chainId, nextStep]);

  return (
    <div className="wizard-content">
      <h1 className="text-center">Switch Network</h1>
      <div className="text-center font-medium">
        Switch to {chainMetadata[selectedChainKey].displayName} to continue.
      </div>
      <div className="text-center">
        <button key={selectedChain.id} onClick={() => switchChain({ chainId: selectedChain.id })}>
          Switch
          {isPending && ' (switching)'}
        </button>
      </div>
      <div>{error?.message}</div>
    </div>
  );
}
