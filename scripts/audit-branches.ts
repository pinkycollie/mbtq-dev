/**
 * Deno-led Branch Audit Tool
 * Identifies old branches and suggests merging or deletion
 */

async function auditBranches() {
  console.log("🔍 Auditing local and remote branches...");

  const process = Deno.run({
    cmd: ["git", "branch", "-a", "--sort=-committerdate"],
    stdout: "piped"
  });

  const output = new TextDecoder().decode(await process.output());
  const branches = output.split("\n").map(b => b.trim()).filter(b => b && !b.startsWith("*"));

  console.log(`\nFound ${branches.length} branches. Top 5 most recent:`);
  branches.slice(0, 5).forEach(b => console.log(`  🟢 ${b}`));

  console.log("\n⚠️ Stale branches (potential candidates for cleanup):");
  branches.slice(10).forEach(b => {
    if (!b.includes("main") && !b.includes("develop")) {
      console.log(`  🟡 ${b}`);
    }
  });

  console.log("\n💡 Recommendation:");
  console.log("  1. Merge 'develop' into active feature branches to sync with Factory updates.");
  console.log("  2. Delete remote branches that have been merged into 'main'.");
}

if (import.meta.main) {
  await auditBranches();
}
