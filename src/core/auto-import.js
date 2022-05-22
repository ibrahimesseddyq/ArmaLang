function autoImport(functionss) {
    const map = {
        t2kedMnType: "types",
        rahObject: "types",
        ChmnType: "types",
        mytbdlch: "types",
        kteb: "standard",
        zid: "standard",
        lsse9: "standard",
        dreb: "standard",
        n9ess: "standard",
        _9ssem: "standard",
        modulo: "standard",
        jider: "standard",
        _9owa: "standard",
        _9reb: "standard",
        ilakan: "standard",
        ola: "standard",
        f: "standard",
        mahed: "standard",
        mnTal: "standard",
        lkolWahd: "standard"
    }
    let functions = functionss.filter(onlyUnique)
    let importStatements = "";
    moduleToFunc = {}
    functions.forEach(element => {
        if (map.hasOwnProperty(element)) {
            if (moduleToFunc[map[element]] == undefined) moduleToFunc[map[element]] = "";
            moduleToFunc[map[element]] += element + ",";
        }
    });
    Object.keys(moduleToFunc).forEach((value) => {
        if (moduleToFunc[value[value.length - 1]] = ",")
            moduleToFunc[value] = moduleToFunc[value].slice(0, -1)
        importStatements += `const { ${moduleToFunc[value]} } = require('./../src/lib/${value}') ;\n`;
    })

    return importStatements;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
module.exports = {
    autoImport
}