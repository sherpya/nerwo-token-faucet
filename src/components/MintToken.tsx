'use client';

import { useEffect, useState } from 'react';
import { useWizard } from 'react-use-wizard';
import { BaseError, parseUnits } from 'viem';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';


import { nerwoTokenConfig } from './contracts';
import { useDebounce } from '../hooks/useDebounce';
import { stringify } from '../utils/stringify';

export function MintToken() {
  const [amount, setTokenId] = useState('');
  const debouncedAmount = useDebounce(amount);
  const { nextStep } = useWizard();

  const { config } = usePrepareContractWrite({
    ...nerwoTokenConfig,
    functionName: 'mint',
    enabled: Boolean(debouncedAmount),
    args: [parseUnits(debouncedAmount, process.env.NEXT_PUBLIC_NERWO_TOKEN_DECIMALS)],
  });
  const { write, data, error, isLoading, isError } = useContractWrite(config);
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash });

  useEffect(() => {
    if (isSuccess) {
      nextStep();
    }
  }, [isSuccess, nextStep]);

  return (
    <>
      <h3>Mint a Nerwo Test Token</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        write?.();
      }}>
        <input
          placeholder="Amount"
          onChange={(e) => setTokenId(e.target.value)} />
        <button className='button-submit' disabled={!write} type="submit">
          Mint
        </button>
      </form>

      {isLoading && <div>Check wallet...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isSuccess && (
        <>
          <div>Transaction Hash: {data?.hash}</div>
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div>
        </>
      )}
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
    </>
  );
}
