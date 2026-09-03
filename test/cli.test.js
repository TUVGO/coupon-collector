const assert = require("node:assert/strict");
const test = require("node:test");
const { parseArgs, run } = require("../src/cli");

test("parseArgs separates positional arguments and options", () => {
  assert.deepEqual(parseArgs(["claim", "demo-coffee", "--provider", "demo"]), {
    positional: ["claim", "demo-coffee"], options: { provider: "demo" }
  });
});

test("list returns demo coupons", async () => {
  const result = await run(["list", "--provider", "demo"]);
  assert.equal(result.ok, true);
  assert.ok(result.coupons.length > 0);
});

test("claim returns a claimed coupon", async () => {
  const result = await run(["claim", "demo-coffee", "--provider", "demo"]);
  assert.equal(result.coupon.status, "claimed");
});

test("unknown coupon produces a scoped error", async () => {
  await assert.rejects(() => run(["claim", "missing"]), { code: "COUPON_NOT_FOUND" });
});

