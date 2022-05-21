const { importTest } = require("./auto-import.data");
const { autoImport } = require("./../src/core/auto-import")
const autoImportTest = (string) => {
    return string.split(",");
}
describe("Testing Auto Import feature", () => {
    test("Import lsse9 and kteb", () => {
        expect(autoImport(autoImportTest("kteb,lsse9"))).toEqual(importTest["kteb,lsse9"])
    })
    test("Import t2kedMnType and lsse9", () => {
        expect(autoImport(autoImportTest("lsse9,t2kedMnType"))).toEqual(importTest["lsse9,t2kedMnType"])
    })
})