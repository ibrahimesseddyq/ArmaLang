function kteb(...args) {
    console.log(...args);
}

function jib() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question('', answer => {
            rl.close();
            resolve(answer);
        });
    });
}

function jibBlaEspace() {
    return jib().then(input => input.trim());
}

function jibAdad() {
    return jibSafi().then(parseFloat);
}

function jibRa9mfassila() {
    return jibSafi().then(parseFloat);
}



function ktebAhlan() {
    console.log('Ahlan ya 3alam');
}

