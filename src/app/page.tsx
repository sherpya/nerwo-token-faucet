import { Unbounded } from 'next/font/google';
import { AccountBalance } from '../components/Balance';
import { Connected } from '../components/Connected';
import { MintToken } from '../components/MintToken';
import { NetworkSwitcher } from '../components/NetworkSwitcher';

const unbounded = Unbounded({ subsets: ['latin'] });

export default function Page() {
  return (
    <main className={unbounded.className}>
      <Connected>
        <div className="flex flex-col gap-1 p-2">
           <hr />
          <h2>Network</h2>
          <NetworkSwitcher />
          <h2>Balance</h2>
          <AccountBalance />
          <h2>Mint</h2>
          <MintToken />
        </div>
      </Connected>
    </main>
  );
}
