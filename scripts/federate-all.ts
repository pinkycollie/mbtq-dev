/**
 * Deno-led Federation Automation
 * Modifies all files locally to ensure @mbtq-dev and @deaf-first naming
 */

import { walk } from "https://deno.land/std@0.210.0/fs/walk.ts";

async function federate() {
  console.log("🚀 Starting Deno federation scan...");

  const replacements = [
    { from: /deaf-first-platform/g, to: "@mbtq-dev/factory-hub" },
    { from: /DEAF-FIRST-PLATFORM/g, to: "mbtq-factory-hub" },
    { from: /"name": "mbtq-dev"/g, to: '"name": "@mbtq-dev/factory-hub"' }
  ];

  for await (const entry of walk(".", {
    exts: [".json", ".md", ".yml", ".yaml", ".ts", ".tsx"],
    skip: [/node_modules/, /\.git/, /dist/]
  })) {
    if (entry.isFile) {
      let content = await Deno.readTextFile(entry.path);
      let changed = false;

      for (const { from, to } of replacements) {
        if (from.test(content)) {
          content = content.replace(from, to);
          changed = true;
        }
      }

      if (changed) {
        await Deno.writeTextFile(entry.path, content);
        console.log(`  ✅ Federated: ${entry.path}`);
      }
    }
  }

  console.log("🏁 Federation complete.");
}

if (import.meta.main) {
  await federate();
}

/**
 * Enhanced: Manifest Generator
 */
async function generateManifests() {
  const coreDirs = ["fibonrose", "server", "client"];
  for (const dir of coreDirs) {
    const manifestPath = `${dir}/manifest.json`;
    const manifest = {
      name: `@mbtq-dev/${dir}`,
      version: "1.0.0",
      status: "STABLE",
      lastUpdate: new Date().toISOString()
    };
    await Deno.writeTextFile(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`  📦 Generated manifest: ${manifestPath}`);
  }
}

await generateManifests();
