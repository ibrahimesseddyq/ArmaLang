@{%
const myLexer = require("./lexer");
%}

@lexer myLexer
# import_js
#     -> "<" %importjsdec ">" _ js _ "</" %importjsdec ">"
program
    -> _ml statements _ml
        {%
            (data) => {
                return data[1];
            }
        %}

statements
    ->  statement (__lb_ statement):*
        {%
            (data) => {
                const repeated = data[1];
                const restStatements = repeated.map(chunks => chunks[1]);
                return [data[0], ...restStatements];
            }
        %}

statement
    -> var_assign  {% id %}
    |  fun_call    {% id %}
    |  %comment    {% id %}
    | ifstat {% id %}
    | func_def {% id %}

var_assign
    -> %vardec _ %identifier _ "=" _ expr
        {%
            (data) => {
                return {
                    type: "var_assign",
                    var_name: data[2],
                    value: data[6]
                }
            }
        %}

fun_call
    -> %identifier _ "(" _ml (arg_list _ml):? ")"
        {%
            (data) => {
                return {
                    type: "fun_call",
                    fun_name: data[0],
                    arguments: data[4] ? data[4][0] : []
                }
            }
        %}

arg_list
    -> expr
        {%
            (data) => {
                return [data[0]];
            }
        %}
    |  arg_list __ml expr
        {%
            (data) => {
                return [...data[0], data[2]];
            }
        %}

expr
    -> %string     {% id %}
    |  %number     {% id %}
    |  %identifier {% id %}
    |  fun_call    {% id %}
    |  lambda      {% id %}
func_def
    -> %funcdec _ %identifier %lparen _ (param_list _):? %rparen  _ml lambda_body
    {% 
        (data)=>{
            return {
                type: "funcdef",
                identifier:data[2],
                parameters: data[5] ? data[5][0] : [],
                body: data[8]
            }
        }
    %}
lambda -> "(" _ (param_list _):? ")" _ "->" _ml lambda_body
    {%
        (data) => {
            return {
                type: "lambda",
                parameters: data[2] ? data[2][0] : [],
                body: data[7]
            }
        }
    %}
    
param_list
    -> %identifier (__ %identifier):*
        {%
            (data) => {
                const repeatedPieces = data[1];
                const restParams = repeatedPieces.map(piece => piece[1]);
                return [data[0], ...restParams];
            }
        %}

lambda_body
    -> expr
        {%
            (data) => {
                return [data[0]];
            }
        %}
    |  "{" __lb_ statements __lb_ "}"
        {%
            (data) => {
                return data[2];
            }
        %}
ifstat
    ->%ifexp expr "{" __lb_ statements __lb_ "}"
# Mandatory line-break with optional whitespace around it
__lb_ -> (_ %NL):+ _

# Optional multi-line whitespace
_ml -> (%WS | %NL):*

# Mandatory multi-line whitespace
__ml -> (%WS | %NL):+

# Optional whitespace    
_ -> %WS:*

# Mandatory whitespace
__ -> %WS:+