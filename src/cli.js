#!/usr/bin/env node

const { getProvider } = require("./providers");

function parseArgs(argv) {
  const positional = [];
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value.startsWith("--")) {
      const key = value.slice(2);
      const next = argv[index + 1];
      options[key] = next && !next.startsWith("--") ? argv[++index] : true;
    } else {
      positional.push(value);
    }
  }
  return { positional, options };
}

async function run(argv) {
  const { positional, options } = parseArgs(argv);
  const command = positional[0];
  const provider = getProvider(options.provider || "demo");
  if (command === "list") {
    return { ok: true, provider: provider.name, coupons: await provider.list() };
  }
  if (command === "claim") {
    if (!positional[1]) {
      const error = new Error("Usage: claim <coupon-id> [--provider <name>]");
      error.code = "INVALID_ARGUMENT";
      throw error;
    }
    return { ok: true, provider: provider.name, coupon: await provider.claim(positional[1]) };
  }
  const error = new Error("Usage: coupon-collector <list|claim> [coupon-id] [--provider <name>]");
  error.code = "INVALID_COMMAND";
  throw error;
}

if (require.main === module) {
  run(process.argv.slice(2))
    .then((result) => process.stdout.write(`${JSON.stringify(result, null, 2)}\n`))
    .catch((error) => {
      process.stderr.write(`${JSON.stringify({ ok: false, error: error.code || "ERROR", message: error.message })}\n`);
      process.exitCode = 1;
    });
}

module.exports = { parseArgs, run };

