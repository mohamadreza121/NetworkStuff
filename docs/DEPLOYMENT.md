# Deployment

1. Install dependencies with `npm ci`.
2. Run `npm run lint` and `npx tsc --noEmit`.
3. Run `npm run test`.
4. Run `npm run build`.
5. Publish through the existing ChatGPT Sites lifecycle.

The build must preserve the Cloudflare-compatible ESM worker output, emitted assets,
`.openai/hosting.json`, the existing Vite/Vinext setup, and lockfile. Runtime secrets
belong in the deployment environment, never in committed `.env` files.
