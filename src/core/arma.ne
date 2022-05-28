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
################################## Echo ##################################
echo
    ->%ecSign _ echoExpr _ %ecSign
    {%
    (data)=>{
        return{
            type:"echo",
            value:data[2]
        }
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
    | echo {% id %}
echoExpr
    ->%string     {% id %}
    |  %number     {% id %}
expr
    -> %string     {% id %}
    |  %number     {% id %}
    |  %identifier {% id %}
    |  fun_call    {% id %}
    |  lambda      {% id %}
    | boolean {% id %}
    | operation {% id%}
    | comparison{% id%}
    | notExpr{% id%}
    | array {% id %}
op_expr
    -> %number 
    | %identifier
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
        | %vardec _ %identifier _ "=" _ operation
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
notExpr
    ->%not _ expr 
    {%
    (data)=>{
        return{
            type:"notexpr",
            value:data[2]
        }
        
    }
    %}
operation
    -> %op_expr _ %operator _ operation
    {% 
        (data)=> {
            return {
                value:`${data[0]} ${data[2]} ${data[4].value ? data[4].value:data[4]}`,
                type:"operation"}
        }
    %}
    | %op_expr
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
    ->%lbrack _ array_items _ %rbrack
    {%
        (data)=>{
            return {
       type:"array",
        value:data[2]
            }
        }
    %}
    | %lbrack _ %rbrack
array_items
    ->expr 
    {% 
    (data)=>[data[0]]
    %}
    |expr %virgule array_items 
    {%
        (data)=>{
            return [data[0],...data[2]]
        }
    %}
######################### Comparison #########################
comparison
    -> expr _ %comparison _ expr 
    {%
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
    %}
 ######################### While #########################
 whileStatement
    -> %whileexp _ expr _ %do _ lambda_body
    {%
        (data)=>{
            return {
                type:"while",
                condition:data[2],
                body:data[6]
            }
        }
    %}
doWhileStatement
    ->%do _ lambda_body _ %whileexp _ expr
        {%
        (data)=>{
            return {
                type:"dowhile",
                condition:data[6],
                body:data[2]
            }
        }
    %}