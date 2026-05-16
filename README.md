This is a [Next.js](https://nextjs.org) + [wagmi](https://wagmi.sh) test-token faucet powered by Bun.

## Setup

1. Install dependencies:

```bash
bun install
```

2. Copy environment variables and customize:

```bash
cp .env.example .env
```

3. Start development server:

```bash
bun run dev
```

## Chain Configuration

Configure the target chain via `.env`:

- `NEXT_PUBLIC_FAUCET_CHAIN=foundry` for local Foundry/Anvil
- `NEXT_PUBLIC_FAUCET_CHAIN=baseSepolia` for Base Sepolia

RPC URLs are also configurable:

- `NEXT_PUBLIC_FOUNDRY_RPC_URL`
- `NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL`

## Static Export

The app is configured for static export (`output: 'export'`).

Build static files with:

```bash
bun run build
```

Generated static assets are written to `out/`.
