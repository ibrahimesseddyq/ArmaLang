const moo = require('moo');
const fs = require("mz/fs");

let lexer = moo.compile({
    WS: /[ \t]+/,
    virgule: ",",
    elseif:"wla lakan",
    boolean: /wah|la/,
    ecSign: "--",
    lparen: '(',
    rparen: ')',
    lbrack: "[",
    rbrack: "]",
    not: /machi|!/,
    comparison: /<|>|>=|<=|==|===|!=|kyssawi|kykhalef|kber men|sgher men/,
    vardec: "dir",
    funcdec: "dala",
    importjsdec: "jib-js",
    returnkey: "reje3",
    ifexp: 'ilakan',
    do: "3mel",
    whileexp: "mahed",
    comment: /\/\/.*?$/,
    number: /0|[1-9][0-9]*/,
    string: /"(?:\\["\\]|[^\n"\\])*"/,
    lbrace: '{',
    rbrace: '}',
    identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
    fatarrow: '->',
    operator: /[-+/*]{1}/,

    assign: '=',

    NL: { match: /\r?\n/, lineBreaks: true }
});

module.exports = lexer;