#  Armalang Syntax Documentation
## Introduction

This document provides an overview of the syntax used in the **Armalang** programming language. It describes the structure and grammar rules for writing programs in **ArmaLang**. Familiarity with this syntax guide will help developers write correct and valid programs in the language.

##  Program Structure

A program in Armalang consists of a series of statements enclosed within curly braces `{}`. Each statement is separated by a newline.

Example:

```markdown
{
    statement1
    statement2
    statement3
    ...
}
```

##  Statements and Expressions
### Statements

A statement represents an action or command in the program. The following types of statements are supported:

-   Variable Assignment: Assigning a value to a variable.
-   Function Call: Invoking a function.
-   Comment: Adding comments to the code.
-   If Statement: Conditional branching.
-   Function Definition: Defining a function.
-   Return Statement: Returning a value from a function.
-   Echo Statement: Printing a value.
-   While Loop: Repeating a block of code while a condition is true.
-   Do-While Loop: Repeating a block of code until a condition is false.
-   Increment/Decrement: Changing the value of a variable by one.
-   Import JS: Importing JavaScript code.
### Expressions
Expressions are used to represent values, calculations, or operations. Supported expression types include:

-   Variables: Representing named values.
-   Function Calls: Invoking functions with arguments.
-   Lambdas: Anonymous functions.
-   Booleans: True or false values.
-   Operations: Arithmetic and logical operations.
-   Comparison: Comparing two values.
-   Not Expression: Negating an expression.
-   Arrays: Collections of values.
## Data Types
Armalang supports the following data types:

-   Boolean: Represents true or false values.
-   Number: Represents numeric values.
-   String: Represents a sequence of characters.
-   Array: Represents an ordered collection of values.
## Control Flow
### If-Else Statements
Conditional branching can be achieved using if-else statements. The syntax for if-else statements is as follows:
```sql
ilakan (condition) {
    // Code to execute if the condition is true
} wla lakan (condition) {
    // Code to execute if the condition is true
} 
```

### While Loop

A while loop allows you to repeat a block of code while a condition is true. The syntax for a while loop is as follows:
```vbnet
mahed (condition) {
    // Code to execute repeatedly while the condition is true
}
```

### Do-While Loop
A do-while loop is similar to a while loop, but it guarantees that the block of code is executed at least once, even if the condition is initially false. The syntax for a do-while loop is as follows:
```arduino
3mel {
    // Code to execute
} mahed (condition);
```


## Function Definitions and Calls
### Function Definitions
Functions in Armalang are defined using the following syntax:
```scss
functionName(parameter1 parameter2 ...) {
    // Function body
}
```
### Function Calls
Function calls are performed by specifying the function name followed by parentheses `()`, containing any required arguments:
There are two types of synchronization and they can complement each other:
```scss
functionName(argument1 argument2 ...)
```
## Variables and Assignments
Variables in Armalang are declared using the `dir` keyword, followed by the variable name and an optional assignment of a value:
```bash
dir variableName = value
```
Variables can be assigned values using the assignment operator `=`:
```makefile
variableName = value
```
## Echo Statements
The `kteb` statement is used to print a value to the output:
```bash
kteb("Hello, World!")
```
## Control Statements
### Return Statement

The `reje3` keyword is used to return a value from a function:
```r
reje3 expression;
```
### Break Statement
The `hbess` keyword is used to exit from a loop or switch statement:
```
hbess;
```
## Jib JS
The `jib-js` keyword is used to import JavaScript code into your Armalang program.
```arduino
jib-js {
    // JavaScript code
}
```
## Conclusion

This documentation provides an overview of the syntax used in Armalang. By understanding the structure and grammar rules described here, developers can write programs effectively in Armalang and utilize its various features and constructs.

Please note that this is just a sample documentation, and you should adapt it to accurately reflect the syntax and features of your specific programming language.

Happy coding with Armalang!
