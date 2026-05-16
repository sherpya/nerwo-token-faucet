'use client';

import { useEffect, useState } from 'react';
import { useWizard } from 'react-use-wizard';
import { BaseError, parseUnits } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { nerwoTokenConfig } from './contracts';
import { useDebounce } from '../hooks/useDebounce';

const DEFAULT_AMOUNT = '1000';

export function MintToken() {
  const [amount, setTokenId] = useState(DEFAULT_AMOUNT);
  const debouncedAmount = useDebounce(amount);
  const { nextStep } = useWizard();

  const tokenDecimals = Number.parseInt(process.env.NEXT_PUBLIC_NERWO_TOKEN_DECIMALS ?? '18', 10);
  const { data: hash, error, isPending, isError, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const canMint = Boolean(debouncedAmount && nerwoTokenConfig.address);

  useEffect(() => {
    if (isSuccess) {
      nextStep();
    }
  }, [isSuccess, nextStep]);

  return (
    <div className="wizard-content">
      <h1 className="text-center">Mint Nerwo Test Tokens</h1>
      <div className="font-medium">Click the button below to mint as many as you want Nerwo test USDT like tokens (for free).
        These tokens are used to do testing inside the Nerwo platform.</div>
      <div className="text-center">
        <form onSubmit={(e) => {
          e.preventDefault();
          if (!canMint) {
            return;
          }

          writeContract({
            ...nerwoTokenConfig,
            functionName: 'mint',
            args: [parseUnits(debouncedAmount, tokenDecimals)],
          });
        }}>
          <input
            placeholder="Amount"
            defaultValue={DEFAULT_AMOUNT}
            onChange={(e) => setTokenId(e.target.value)} />
          <button className="button-submit" disabled={!canMint || isPending || isConfirming} type="submit">
            Mint
          </button>
        </form>
      </div>

      {isPending && <div>Check wallet...</div>}
      {isConfirming && <div>Transaction pending...</div>}
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
    </div>
  );
}
