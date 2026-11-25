// Famous Last Words: The Funniest Epitaph
// make.fun bounty u-riidzhsn-famous-last-words-the-funniest-epitaph-ff177406
//
// Writes the funniest possible famous last words as a single tombstone
// epitaph (at most 150 characters) to /output/entry.txt.
// Deterministic: the same epitaph on every run, no randomness, no network.

import { mkdirSync, renameSync, writeFileSync } from "node:fs";

const EPITAPH =
  "I told you I was dying. You said I was being dramatic.";

// The sealed gate: /output/entry.txt must be UTF-8 text of 1 to 150
// characters, not only white space, and a single line of dying speech.
// Fail loudly instead of writing an entry the gate would refuse.
if (EPITAPH.length < 1 || EPITAPH.length > 150) {
  throw new Error(`Epitaph is ${EPITAPH.length} characters, must be 1-150.`);
}
if (EPITAPH.trim().length === 0) {
  throw new Error("Epitaph must not be only white space.");
}
if (/\r|\n/.test(EPITAPH)) {
  throw new Error("Epitaph must be a single line.");
}

mkdirSync("/output", { recursive: true });
// Atomic write: a reader on the shared /output never sees a partial file.
const tmp = `/output/.entry.txt.tmp-${process.pid}`;
writeFileSync(tmp, EPITAPH, "utf8");
renameSync(tmp, "/output/entry.txt");
console.log(`Wrote ${EPITAPH.length} characters to /output/entry.txt`);
