const fs = require("mz/fs");
const util = require('util');
const { armaConfig } = require("./arma.config")
const exec = util.promisify(require('child_process').exec);

async function armaLang(fn = undefined) {
    if (!armaConfig.production) {
        let filename = process.argv[2];

        if (!filename) {
            console.log("Please provide a .darija file.");
            return;
        }

        const astFilename = filename.replace(".darija", ".ast");
        const jsFilename = filename.replace(".darija", ".js");
        await Execute(`node ./src/core/parse.js ${filename}`);
        await Execute(`node ./src/core/generate.js ${astFilename}`);
        await Execute(`node ${jsFilename}`);
    } else {
        if (!fn)
            throw new Error("Specify the path of your .darija file in the argument")
        let filename = fn;

        const astFilename = filename.replace(".darija", ".ast");
        const jsFilename = filename.replace(".darija", ".js");
        await Execute(`node ./node_modules/armalang/src/core/parse.js ${filename}`);
        await Execute(`node ./node_modules/armalang/src/core/generate.js ${astFilename}`);
        console.log(jsFilename)
        await Execute(`node ${jsFilename}`);
    }

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
if (!armaConfig.production)
    armaLang()
module.exports = {
    armaLang
}