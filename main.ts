// Last Text at One Percent — the dying phone's final text message.
// The phone has exactly one percent left and one confession to make:
// it was never broken, it was petty. Written in its own voice, one line.
// Verified: the message is 110 characters, one line, well under the 200 cap.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DYING_WORDS =
  "Before I die: your alarm was never broken. I just liked watching you panic every morning. Good luck waking up.";

const MAX_CHARS = 200;

function checkSingleLine(text: string): void {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`final text must be 1-${MAX_CHARS} chars, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("final text is blank");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("final text must fit in one text message");
  }
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  checkSingleLine(DYING_WORDS);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), DYING_WORDS, "utf8");
}

main();
