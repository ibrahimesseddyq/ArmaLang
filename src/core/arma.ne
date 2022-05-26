@{%
const myLexer = require("./lexer");
%}

@lexer myLexer
# import_js
#     -> "<" %importjsdec ">" _ js _ "</" %importjsdec ">"
# Defining the program structure
################################## Program ##################################
program
    -> _ml statements _ml
        {%
            (data) => {
                return data[1];
            }
        %}

################################## Types ##################################
boolean
    ->  %boolean  {%
        (data)=>{
            console.log(data)
            if(data == "wah"){
                return "true";
            }
            else
                return "false"
            return data == "wah" ? "true":"false";
        }
    %}
################################## Statement & Expressions ##################################
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
    | ifstatement {% id %}
    | func_definition {% id %}
    | returnStatement {% id %}
expr
    -> %string     {% id %}
    |  %number     {% id %}
    |  %identifier {% id %}
    |  fun_call    {% id %}
    |  lambda      {% id %}
    | boolean {% id %}
    | operation {% id%}
################################## Variable Assignement ##################################
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
################################## Functions ##################################
func_definition
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
    #Defining a lambda function 
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
returnStatement
    -> %returnkey _ expr 
    {%
        (data)=>{
                console.log(data)

            return{
                type:"return",
                value: data[2].value 
            }
        }
    %}
################################## If && Else ##################################
ifstatement
    ->%ifexp __ expr _ml "{" __lb_ statements __lb_ "}" {% 
        (data)=>{
            return {
                type:"if",
                condition:data[2],
                body:data[6]
            }
            
        }
    %}

operation
    -> %number _ %operator _ operation
    {% 
        (data)=> {
            return {
                value:`${data[0]} ${data[2]} ${data[4].value ? data[4].value:data[4]}`,
                type:"operation"}
        }
    %}
    | %number
# operations
#     -> operation _ %operator _ operations {%
#             (data)=>{
#                 console.log("ops",[data[0],data[2],data[4].value].join(""))
#         return {
#             type:"operation",
#             value:[data[0],data[2],data[4].value].join("") // 3+6*7*6 ["3+6","*7"]
#         }
#     } 

#     %}
    
#     | operation _ %operator _ expr 
#     {%
#         (data)=>{
#             return{
#                 type:"operation",
#                 value: data[0]+data[2]+data[4]
#             }
#         }
#     %}
#     | operation {%
#             (data)=>{

#         return {
#             type:"operation",
#             value:data[0]
#         }
#     }
#     %}

## 3+4*3 n op n
################################## Spaces && Multilines ##################################
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


######################### ARRAYS #########################################
array 
    ->"[" array_list "]"
    | "[" _ "]"
array_items
    ->expr 
    {% 
    (data)=>[data[0]]
    %}
    |expr "," array_items 
    {%
        (data)=>{
            return [data[0],...data[2]]
        }
    %}