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
  const catalog = await vite.ssrLoadModule("/content/cisco/ccna/index.ts");
  const result = {
    examVersion: "200-301 v1.1",
    ...catalog.ccnaContentStats,
    missingObjectiveIds: catalog.ccnaMissingObjectives,
  };
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (catalog.ccnaMissingObjectives.length > 0) process.exitCode = 1;
} finally {
  await vite.close();
}
