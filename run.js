const fs = require("mz/fs");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function main() {
    const filename = process.argv[2];
    if (!filename) {
        console.log("Please provide a .darija file.");
        return;
    }
    const astFilename = filename.replace(".darija", ".ast");
    const jsFilename = filename.replace(".darija", ".js");
    await Execute(`node ./core/parse.js ${filename}`);
    await Execute(`node ./core/generate.js ${astFilename}`);
    await Execute(`node ./core/${jsFilename}`);
}

async function Execute(command) {
    const output = await exec(command);
    if (output.stdout) {
        process.stdout.write(output.stdout);
    }
    if (output.stderr) {
        process.stdout.write(output.stderr);
    }
}

main().catch(err => console.log(err.stack));