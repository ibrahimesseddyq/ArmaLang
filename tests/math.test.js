const math = require('./../src/lib/standard')
const mathData = require("./math.data")

describe("Testing math Function", () => {
    test("3 + 3", () => {
        expect(math.zid(3, 3)).toBe(6)
    })
})