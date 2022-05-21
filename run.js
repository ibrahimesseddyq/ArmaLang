const fs = require("mz/fs");
const util = require('util');
const { config } = require("./arma.config")
const exec = util.promisify(require('child_process').exec);

async function main() {
    const filename = process.argv[2];
    if (!filename && config.useCustomFilePath && !config.bootstrapPath) {
        console.log("Please provide a .darija file.");
        return;
    } else if (!filename && !config.useCustomFilePath && config.bootstrapPath) {
        filename = config.bootstrapPath;
    } else if (!filename && !config.bootstrapPath && config.useCustomFilePath) {
        throw new Error("Kayn chi problem f configuration")
    }
    const astFilename = filename.replace(".darija", ".ast");
    const jsFilename = filename.replace(".darija", ".js");
    await Execute(`node ./src/core/parse.js ${filename}`);
    await Execute(`node ./src/core/generate.js ${astFilename}`);
    await Execute(`node ${jsFilename}`);
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