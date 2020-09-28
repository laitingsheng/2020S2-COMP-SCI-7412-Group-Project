import assert from "assert"

import verifiers from "../src/verifiers.js"

describe("verifier", function() {
    for (const label in verifiers)
        it(`${label} must have an appropriate signature and never fail`, function() {
            const verifier = verifiers[label]
            assert.ok(verifier instanceof Function)
            assert.strictEqual(verifier.length, 1)
            assert.ok(verifier({}) instanceof Promise)
        })

    it("DUMMY should always return true", async function() {
        assert.strictEqual(await verifiers.DUMMY({}), true)
    })
})
