@{%
const myLexer = require("./lexer");
%}

@lexer myLexer

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
            console.log(data[0].value)
            if(data[0].value == "wah"){
                return {
                    type:"boolean",
                    value:"true"}
                    ;
            }
            else
                return {
                    type:"boolean",
                    value:"false"}
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
    | value_assign {% id %}
    |  fun_call    {% id %}
    |  %comment    {% id %}
    | ifstatement {% id %}
    | func_definition {% id %}
    | returnStatement {% id %}
    | echo {% id %}
    | whileStatement {% id %}
    | doWhileStatement {% id %}
    |incdec{% id %}
    |importjs {% id %}
echoExpr
    ->%string     {% id %}
    |  %number     {% id %}
expr
    -> %string     {% id %}
    |  %number     {% id %}
    |  %identifier {% id %}
    | operation {% id%}
    |  fun_call    {% id %}
    |  lambda      {% id %}
    | boolean {% id %}
    | comparison{% id%}
    | notExpr1{% id%}
    | notExpr2{% id%}

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
value_assign
    ->%identifier _ "=" _ expr
    {%
        (data)=>{
            return{
                type:"valassign",
                identifier:data[0],
                value:data[4]
            }
        }
    %}
    incdec
        -> %identifier %incdec {%
            (data)=>{
                console.log(data)
            return{
                type:"incdec",
                identifier:data[0],
                value:`${data[0]}${data[1]}`
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
breakstatement
    ->%breakstatement {% (data)=>{return{type:"break",value:"break"}}%}
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
    %} |%ifexp __ expr _ml "{" __lb_ statements __lb_ "}" _ml elseif 
    {%
        (data)=>{
            return{
                type:"if",
                condition:data[2],
                body:data[6],
                elseif:data[10]
            }
        }
    %}

elseif
    ->%elseif _ expr _ml "{" __lb_ statements __lb_ "}"
    {%
        (data)=>{
            return{
                type:"elseif",
                condition:data[2],
                body:data[6]
            }
        }
    %}
    | %elseif _ expr _ml "{" __lb_ statements __lb_ "}" _ml elseif
        {%
        (data)=>{
            return{
                type:"elseif",
                condition:data[2],
                body:data[6],
                repeated:data[10]
            }
        }
    %}
notExpr1
    ->%not _ expr 
    {%
    (data)=>{
        return{
            type:"notexpr",
            value:data[2]
        }
        
    }
    %}
notExpr2
    -> expr _ %not _ expr
    {%
        (data)=>{
        return{
            type:"notexpr2",
            value1:data[0],
            value2:data[4]
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
    {%
        (data)=>{
            return {
                type:"array",
                value:null
            }
        }
    %}
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
    -> %whileexp _ expr _ %_do _ lambda_body
    {%
        (data)=>{
            return {
                type:"while",
                dowhile:false,
                condition:data[2],
                body:data[6]
            }
        }
    %}
doWhileStatement
    ->%_do _ lambda_body _ %whileexp _ expr
        {%
        (data)=>{
            return {
                type:"while",
                dowhile:true,
                condition:data[6],
                body:data[2]
            }
        }
    %}
################################# Jib JS #############################################
importjs
    ->%importjsdec _ml %content _ml %importjsdec
    {%
        (data)=>{
                console.log(data)

            return {
                type:"jibjs",
                value:data[2]
            }
        }
    %}