const moo = require('moo');
const fs = require("mz/fs");

let lexer = moo.compile({
    WS: /[ \t]+/,
    ecSign: "--",
    lparen: '(',
    rparen: ')',
    vardec: "dir",
    funcdec: "dala",
    importjsdec: "jib-js",
    comment: /\/\/.*?$/,
    number: /0|[1-9][0-9]*/,
    string: /"(?:\\["\\]|[^\n"\\])*"/,
    lbrace: '{',
    rbrace: '}',
    identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
    fatarrow: '->',
    assign: '=',
    ifexp: 'ilakan',
    whileexp: "mahed",
    NL: { match: /\r?\n/, lineBreaks: true }
});

module.exports = lexer;