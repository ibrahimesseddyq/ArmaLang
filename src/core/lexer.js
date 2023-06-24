const moo = require('moo');
const fs = require("mz/fs");

let lexer = moo.compile({
    importjsdec: "<jib-js>",

    WS: /[ \t]+/,
    virgule: ",",
    elseif:"wla lakan",
    boolean: /wah|s7i7|ghalat|la/,
    ecSign: "-/-",
    breakstatement:"hbess",
    lparen: '(',
    rparen: ')',
    lbrack: "[",
    rbrack: "]",
    not: /machi|!/,
    incdec:/\+\+|--/,
    comparison: /<|>|>=|<=|==|===|!=|kyssawi|kykhalef|kber men|sgher men/,
    vardec: "dir",
    funcdec: "dala",
    returnkey: "reje3",
    ifexp: 'ilakan',
    _do: "3mel",
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
    content:/[a-zA-Z.-_$=><?|&]+/,
    NL: { match: /\r?\n/, lineBreaks: true }
});

module.exports = lexer;