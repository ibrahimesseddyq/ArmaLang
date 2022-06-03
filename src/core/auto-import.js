const { armaConfig } = require("./../../arma.config")

function autoImport(functionss) {
    const {map} = require("./modules") 
    let functions = functionss.filter(onlyUnique)
    let importStatements = "";
    moduleToFunc = {}
    functions.forEach(element => {
        if (map.hasOwnProperty(element)) {
            if (moduleToFunc[map[element]] == undefined) moduleToFunc[map[element]] = "";
            // if (moduleToFunc[map[element]] == undefined) throw new Error("had lfonction mm3rofash")
            moduleToFunc[map[element]] += element + ",";
        }
    });
    Object.keys(moduleToFunc).forEach((value) => {
        if (moduleToFunc[value[value.length - 1]] = ",")
            moduleToFunc[value] = moduleToFunc[value].slice(0, -1)
        if (!armaConfig.production)
            importStatements += `const { ${moduleToFunc[value]} } = require('./../src/lib/${value}') ;\n`;
        else
            importStatements += `const { ${moduleToFunc[value]} } = require('armalang/src/lib/${value}') ;\n`;
    })

    return importStatements;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
module.exports = {
    autoImport
}