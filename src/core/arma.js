// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const myLexer = require("./lexer");
var grammar = {
    Lexer: myLexer,
    ParserRules: [
    {"name": "program", "symbols": ["_ml", "statements", "_ml"], "postprocess": 
        (data) => {
            return data[1];
        }
                },
    {"name": "boolean", "symbols": [(myLexer.has("boolean") ? {type: "boolean"} : boolean)], "postprocess": 
        (data)=>{
            console.log(data)
            if(data == "wah"){
                return "true";
            }
            else
                return "false"
            return data == "wah" ? "true":"false";
        }
            },
    {"name": "echo", "symbols": [(myLexer.has("ecSign") ? {type: "ecSign"} : ecSign), "_", "echoExpr", "_", (myLexer.has("ecSign") ? {type: "ecSign"} : ecSign)], "postprocess": 
        (data)=>{
            return{
                type:"echo",
                value:data[2]
            }
        }
        },
    {"name": "statements$ebnf$1", "symbols": []},
    {"name": "statements$ebnf$1$subexpression$1", "symbols": ["__lb_", "statement"]},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", "statements$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["statement", "statements$ebnf$1"], "postprocess": 
        (data) => {
            const repeated = data[1];
            const restStatements = repeated.map(chunks => chunks[1]);
            return [data[0], ...restStatements];
        }
                },
    {"name": "statement", "symbols": ["var_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["fun_call"], "postprocess": id},
    {"name": "statement", "symbols": [(myLexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "statement", "symbols": ["ifstatement"], "postprocess": id},
    {"name": "statement", "symbols": ["func_definition"], "postprocess": id},
    {"name": "statement", "symbols": ["returnStatement"], "postprocess": id},
    {"name": "statement", "symbols": ["echo"], "postprocess": id},
    {"name": "echoExpr", "symbols": [(myLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "echoExpr", "symbols": [(myLexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expr", "symbols": [(myLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expr", "symbols": [(myLexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expr", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "expr", "symbols": ["fun_call"], "postprocess": id},
    {"name": "expr", "symbols": ["lambda"], "postprocess": id},
    {"name": "expr", "symbols": ["boolean"], "postprocess": id},
    {"name": "expr", "symbols": ["operation"], "postprocess": id},
    {"name": "expr", "symbols": ["comparison"], "postprocess": id},
    {"name": "expr", "symbols": ["notExpr"], "postprocess": id},
    {"name": "expr", "symbols": ["array"], "postprocess": id},
    {"name": "op_expr", "symbols": [(myLexer.has("number") ? {type: "number"} : number)]},
    {"name": "op_expr", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier)]},
    {"name": "var_assign", "symbols": [(myLexer.has("vardec") ? {type: "vardec"} : vardec), "_", (myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"="}, "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: "var_assign",
                var_name: data[2],
                value: data[6]
            }
        }
                },
    {"name": "var_assign", "symbols": [(myLexer.has("vardec") ? {type: "vardec"} : vardec), "_", (myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"="}, "_", "operation"], "postprocess": 
        (data) => {
            return {
                type: "var_assign",
                var_name: data[2],
                value: data[6]
            }
        }
                },
    {"name": "func_definition$ebnf$1$subexpression$1", "symbols": ["param_list", "_"]},
    {"name": "func_definition$ebnf$1", "symbols": ["func_definition$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "func_definition$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "func_definition", "symbols": [(myLexer.has("funcdec") ? {type: "funcdec"} : funcdec), "_", (myLexer.has("identifier") ? {type: "identifier"} : identifier), (myLexer.has("lparen") ? {type: "lparen"} : lparen), "_", "func_definition$ebnf$1", (myLexer.has("rparen") ? {type: "rparen"} : rparen), "_ml", "lambda_body"], "postprocess":  
        (data)=>{
            return {
                type: "funcdef",
                identifier:data[2],
                parameters: data[5] ? data[5][0] : [],
                body: data[8]
            }
        }
            },
    {"name": "lambda$ebnf$1$subexpression$1", "symbols": ["param_list", "_"]},
    {"name": "lambda$ebnf$1", "symbols": ["lambda$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "lambda$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "lambda", "symbols": [{"literal":"("}, "_", "lambda$ebnf$1", {"literal":")"}, "_", {"literal":"->"}, "_ml", "lambda_body"], "postprocess": 
        (data) => {
            return {
                type: "lambda",
                parameters: data[2] ? data[2][0] : [],
                body: data[7]
            }
        }
            },
    {"name": "param_list$ebnf$1", "symbols": []},
    {"name": "param_list$ebnf$1$subexpression$1", "symbols": ["__", (myLexer.has("identifier") ? {type: "identifier"} : identifier)]},
    {"name": "param_list$ebnf$1", "symbols": ["param_list$ebnf$1", "param_list$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "param_list", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "param_list$ebnf$1"], "postprocess": 
        (data) => {
            const repeatedPieces = data[1];
            const restParams = repeatedPieces.map(piece => piece[1]);
            return [data[0], ...restParams];
        }
                },
    {"name": "lambda_body", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "lambda_body", "symbols": [{"literal":"{"}, "__lb_", "statements", "__lb_", {"literal":"}"}], "postprocess": 
        (data) => {
            return data[2];
        }
                },
    {"name": "fun_call$ebnf$1$subexpression$1", "symbols": ["arg_list", "_ml"]},
    {"name": "fun_call$ebnf$1", "symbols": ["fun_call$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "fun_call$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "fun_call", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_ml", "fun_call$ebnf$1", {"literal":")"}], "postprocess": 
        (data) => {
            return {
                type: "fun_call",
                fun_name: data[0],
                arguments: data[4] ? data[4][0] : []
            }
        }
                },
    {"name": "arg_list", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "arg_list", "symbols": ["arg_list", "__ml", "expr"], "postprocess": 
        (data) => {
            return [...data[0], data[2]];
        }
                },
    {"name": "returnStatement", "symbols": [(myLexer.has("returnkey") ? {type: "returnkey"} : returnkey), "_", "expr"], "postprocess": 
        (data)=>{
                console.log(data)
        
            return{
                type:"return",
                value: data[2].value 
            }
        }
            },
    {"name": "ifstatement", "symbols": [(myLexer.has("ifexp") ? {type: "ifexp"} : ifexp), "__", "expr", "_ml", {"literal":"{"}, "__lb_", "statements", "__lb_", {"literal":"}"}], "postprocess":  
        (data)=>{
            return {
                type:"if",
                condition:data[2],
                body:data[6]
            }
            
        }
            },
    {"name": "ifstatement", "symbols": [(myLexer.has("ifexp") ? {type: "ifexp"} : ifexp), "__", "expr", "_ml", {"literal":"{"}, "__lb_", "statements", "__lb_", {"literal":"}"}, "_ml", "elseif"], "postprocess": 
        (data)=>{
            return{
                type:"if",
                condition:data[2],
                body:data[6],
                elseif:data[10]
            }
        }
            },
    {"name": "elseif", "symbols": [(myLexer.has("elseif") ? {type: "elseif"} : elseif), "_", "expr", "_ml", {"literal":"{"}, "__lb_", "statements", "__lb_", {"literal":"}"}], "postprocess": 
        (data)=>{
            return{
                type:"elseif",
                condition:data[2],
                body:data[6]
            }
        }
            },
    {"name": "elseif", "symbols": [(myLexer.has("elseif") ? {type: "elseif"} : elseif), "_", "expr", "_ml", {"literal":"{"}, "__lb_", "statements", "__lb_", {"literal":"}"}, "_ml", "elseif"], "postprocess": 
        (data)=>{
            return{
                type:"elseif",
                condition:data[2],
                body:data[6],
                repeated:data[10]
            }
        }
            },
    {"name": "notExpr", "symbols": [(myLexer.has("not") ? {type: "not"} : not), "_", "expr"], "postprocess": 
        (data)=>{
            return{
                type:"notexpr",
                value:data[2]
            }
            
        }
        },
    {"name": "operation", "symbols": [(myLexer.has("op_expr") ? {type: "op_expr"} : op_expr), "_", (myLexer.has("operator") ? {type: "operator"} : operator), "_", "operation"], "postprocess":  
        (data)=> {
            return {
                value:`${data[0]} ${data[2]} ${data[4].value ? data[4].value:data[4]}`,
                type:"operation"}
        }
            },
    {"name": "operation", "symbols": [(myLexer.has("op_expr") ? {type: "op_expr"} : op_expr)]},
    {"name": "__lb_$ebnf$1$subexpression$1", "symbols": ["_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__lb_$ebnf$1", "symbols": ["__lb_$ebnf$1$subexpression$1"]},
    {"name": "__lb_$ebnf$1$subexpression$2", "symbols": ["_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__lb_$ebnf$1", "symbols": ["__lb_$ebnf$1", "__lb_$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__lb_", "symbols": ["__lb_$ebnf$1", "_"]},
    {"name": "_ml$ebnf$1", "symbols": []},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "_ml$ebnf$1", "symbols": ["_ml$ebnf$1", "_ml$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_ml", "symbols": ["_ml$ebnf$1"]},
    {"name": "__ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__ml$ebnf$1$subexpression$1", "symbols": [(myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__ml$ebnf$1", "symbols": ["__ml$ebnf$1$subexpression$1"]},
    {"name": "__ml$ebnf$1$subexpression$2", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__ml$ebnf$1$subexpression$2", "symbols": [(myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__ml$ebnf$1", "symbols": ["__ml$ebnf$1", "__ml$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__ml", "symbols": ["__ml$ebnf$1"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (myLexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (myLexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]},
    {"name": "array", "symbols": [(myLexer.has("lbrack") ? {type: "lbrack"} : lbrack), "_", "array_items", "_", (myLexer.has("rbrack") ? {type: "rbrack"} : rbrack)], "postprocess": 
         (data)=>{
             return {
        type:"array",
         value:data[2]
             }
         }
            },
    {"name": "array", "symbols": [(myLexer.has("lbrack") ? {type: "lbrack"} : lbrack), "_", (myLexer.has("rbrack") ? {type: "rbrack"} : rbrack)]},
    {"name": "array_items", "symbols": ["expr"], "postprocess":  
        (data)=>[data[0]]
        },
    {"name": "array_items", "symbols": ["expr", (myLexer.has("virgule") ? {type: "virgule"} : virgule), "array_items"], "postprocess": 
        (data)=>{
            return [data[0],...data[2]]
        }
            },
    {"name": "comparison", "symbols": ["expr", "_", (myLexer.has("comparison") ? {type: "comparison"} : comparison), "_", "expr"], "postprocess": 
        (data)=>{
            if(data[2]=="kyssawi"){
                data[2]= "==";
            
            }
            else if(data[2]=="kykhalef"){
                data[2]="!=";
            }else if(data[2]=="kber men"){
                data[2]=">";
            }else if(data[2]=="sgher men"){
                data[2]="<";
            }
        
            return{
                type:"comparison",
                value: `${data[0]} ${data[2]} ${data[4]}`
            }
        }
            }
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
