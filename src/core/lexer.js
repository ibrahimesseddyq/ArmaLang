const moo = require('moo');
const fs = require("mz/fs");

let lexer = moo.compile({
    WS: /[ \t]+/,
    boolean: /wah|la/,
    operator: /[-+/*]{1}/,
    ecSign: "--",
    lparen: '(',
    rparen: ')',
    vardec: "dir",
    funcdec: "dala",
    importjsdec: "jib-js",
    returnkey: "reje3",
    ifexp: 'ilakan',
    whileexp: "mahed",
    comment: /\/\/.*?$/,
    number: /0|[1-9][0-9]*/,
    string: /"(?:\\["\\]|[^\n"\\])*"/,
    lbrace: '{',
    rbrace: '}',
    identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
    fatarrow: '->',
    assign: '=',

    NL: { match: /\r?\n/, lineBreaks: true }
});

module.exports = lexer;