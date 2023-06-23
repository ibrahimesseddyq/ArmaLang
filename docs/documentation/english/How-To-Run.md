
# Armalang Documentation
## Introduction
Armalang is a programming language designed for learning purpose. This documentation provides step-by-step instructions on how to run Armalang programs on your system. By following this guide, you'll be able to set up the necessary environment and execute Armalang code.
## Prerequisites
Before you can run Armalang programs, ensure that you have the following prerequisites installed on your system:
1.  Node.js: Armalang is built on Node.js, so you need to have Node.js installed. You can download Node.js from the official website: [https://nodejs.org](https://nodejs.org)
## Installation
To install Armalang, follow these steps:

1.  Clone the Armalang repository from GitHub: [https://github.com/ibrahimesseddyq/ArmaLang](https://github.com/ibrahimesseddyq/ArmaLang)
    
2.  Navigate to the project directory:
```bash
cd armalang
```
-   Install the required dependencies by running the following command:
    

```
npm install
```
## Running Armalang Programs
Once you have Armalang installed, you can run Armalang programs using the following steps:

1.  Write your Armalang program in a file with the `.darija` extension.
    
2.  Open a terminal or command prompt and navigate to the Armalang project directory.
    
3.  Execute the Armalang program using the following command,  Replace `<filename.darija>` with the actual path to your Armalang program file:
```php-template
node index.js <filename.darija>
```
4.  The Armalang program will be parsed, generated into JavaScript code, and executed. Any output or errors will be displayed in the console.
## Advanced Usage
The provided code includes additional features for running Armalang programs in different environments:

-   Development Mode:
    
    -   If you run the script without any command-line arguments, it expects the `.darija` filename as the first argument (`process.argv[2]`). Provide the path to the Armalang program as the first argument when executing the script.
-   Production Mode:
    
    -   To run Armalang programs in production mode, pass the `.darija` filename as an argument when calling the `armaLang` function.

Example:
```javascript
armaLang("path/to/your/file.darija");
```
## Configuration
The `arma.config.js` file contains the configuration settings for Armalang. Modify this file according to your project's requirements. Set `armaConfig.production` to `true` or `false` based on the environment you are running Armalang in.
## Conclusion
This documentation provided instructions on how to run Armalang programs using the provided code. By following the steps outlined here, you can execute Armalang programs and leverage the additional features provided by the script.

If you encounter any issues or have further questions, refer to the Armalang documentation or seek assistance from the Armalang community. Happy coding with Armalang!
