const fs = require("mz/fs");
const { autoImport } = require("./auto-import");
var functions = [];
async function main() {
    const filename = process.argv[2];
    if (!filename) {
        console.log("Please provide a .ast file.");
        return;
    }

    const astJson = (await fs.readFile(filename)).toString();
    // const runtimeJs = (await fs.readFile("./src/lib/standard.js")).toString();
    const statements = JSON.parse(astJson);

    const firstJsCode = generateJsForStatements(statements) + "\n";
    const runtimeJs = autoImport(functions);
    jsCode = runtimeJs + firstJsCode;
    // const jsCode = generateJsForStatements(statements) + "\n" + runtimeJs;
    const outputFilename = filename.replace(".ast", ".js");
    await fs.writeFile(outputFilename, jsCode);
    console.log(`Wrote ${outputFilename}.\n\n\n------------------------------`);
}

function generateJsForStatements(statements) {
    const lines = [];
    for (let statement of statements) {
        const line = generateJsForStatementOrExpr(statement);
        lines.push(line);
    }
    return lines.join("\n");
}


function generateJsForStatementOrExpr(node) {
    let paramList;
    let jsBody;
    switch (node.type) {
        case "var_assign":
            const varName = node.var_name.value;
            const jsExpr = generateJsForStatementOrExpr(node.value);
            const js = `var ${varName} = ${jsExpr};`;
            return js;
        case "fun_call":
            let funName = node.fun_name.value;
            functions.push(funName);
            const argList = node.arguments.map((arg) => {
                return generateJsForStatementOrExpr(arg);
            }).join(", ");
            return `${funName}(${argList})`;
        case "string":
        case "number":
        case "identifier":
            return node.value;
        case "lambda":
            paramList = node.parameters
                .map(param => param.value)
                .join(", ");
            jsBody = node.body.map((arg, i) => {
                const jsCode = generateJsForStatementOrExpr(arg);
                if (i === node.body.length - 1) {
                    return "return " + jsCode;
                } else {
                    return jsCode;
                }
            }).join(";\n");
            return `function (${paramList}) {\n${indent(jsBody)}\n}`;
        case "funcdef":
            let funcName = node.identifier.value;
            paramList = node.parameters
                .map(param => param.value)
                .join(", ");

            jsBody = node.body.map((arg, i) => {
                const jsCode = generateJsForStatementOrExpr(arg);
                return jsCode;
            }).join(";\n");
            return `function ${funcName}(${paramList}) {\n${indent(jsBody)}\n}`;
        case "comment":
            return "";
        case "if":
            let elseif ="";
            let repeat = "";
            let expression = generateJsForStatementOrExpr(node.condition);
            // expression = expression == "wah" ? "true" : "false";
            jsBody = node.body.map((arg, i) => {
                const jsCode = generateJsForStatementOrExpr(arg);
                return jsCode;
            }).join(";\n")

            if(node.hasOwnProperty("elseif")){
                elseif= generateJsForStatementOrExpr(node.elseif)
                // elseif= `else if (${node.elseif.condition.value}){${node.elseif.body.map((arg, i) => {
                //     const jsCode = generateJsForStatementOrExpr(arg);
                //     return jsCode;
                // }).join(";\n")}}`;
                // console.log("elseif :"+elseif)

                // if(node.elseif.hasOwnProperty("repeated")){
                //     console.log("repeated :"+elseif)
                //     elseif +=  generateJsForStatementOrExpr(node.elseif);
                    
                // }
            }
            return `if(${expression}){${jsBody}} ${elseif}`;
        case "operation":
            if (typeof node.value == "object")
                return generateJsForStatementOrExpr(node.value);
            else
                return node.value
        case "return":
            console.log(node);
            return node.value ? `return ${node.value}` : "return;"
        case "comparison":
        case "break":
            return node.value;
        case "notexpr1":
            return `!${generateJsForStatementOrExpr(node.value)}`;
        case "notexpr2":
            return `${generateJsForStatementOrExpr(node.value1)} != ${generateJsForStatementOrExpr(node.value2)}`
        case "echo":
            return `console.log(${generateJsForStatementOrExpr(node.value)})`;
        case "array":
            if(!node.value) return "[]";
            arrList = node.value
                .map(param => param.value)
                .join(", ");
            return `[${arrList}]`;
        
        case "elseif":

            let repeated = node.hasOwnProperty("repeated") ? generateJsForStatementOrExpr(node.repeated) : "";

            let expression2 = generateJsForStatementOrExpr(node.condition);
            // expression = expression == "wah" ? "true" : "false";
            console.log("wah")
            jsBody = node.body.map((arg, i) => {
                const jsCode = generateJsForStatementOrExpr(arg);
                return jsCode;
            }).join(";\n")
            return `else if(${expression2}){${jsBody}}` + repeated;
            case "while":
                let whileexpression = generateJsForStatementOrExpr(node.condition);
                // expression = expression == "wah" ? "true" : "false";
                jsBody = node.body.map((arg, i) => {
                    const jsCode = generateJsForStatementOrExpr(arg);
                    return jsCode;
                }).join(";\n")
                if(!node.dowhile)
                    return `while(${whileexpression}){${jsBody}};`;
                return `do{${jsBody}}while(${whileexpression});`
            case "valassign":
                return `${node.identifier} = ${node.value}`
            case "incdec":
                return node.value
            case "boolean":
                return node.value
            case "jibjs":
                return node.value
    }
    
}

function indent(string) {
    return string.split("\n").map(line => "    " + line).join("\n");
}

main().catch(err => console.log(err.stack));