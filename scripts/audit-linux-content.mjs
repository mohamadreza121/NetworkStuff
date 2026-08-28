import { createServer } from "vite";

const root = process.cwd();
const vite = await createServer({
  appType: "custom",
  configFile: false,
  root,
  resolve: { alias: { "@": root } },
  server: { middlewareMode: true, watch: { ignored: ["**/dist/**", "**/.next/**"] } },
});

try {
  const catalog = await vite.ssrLoadModule("/content/linux/network-engineering/index.ts");
  const result = {
    curriculumVersion: "Network Operations 2026",
    ...catalog.linuxContentStats,
    missingCapabilityIds: catalog.linuxMissingCapabilities,
  };
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (catalog.linuxMissingCapabilities.length > 0) process.exitCode = 1;
} finally {
  await vite.close();
}
