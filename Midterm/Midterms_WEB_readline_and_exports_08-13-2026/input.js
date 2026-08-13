const readline = require('node:readline');

const ask = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(message) {
    return new Promise((resolve) => {
        ask.question(message, (answer) => {
            resolve(answer);
        });
    });
}

function close() {
    ask.close();
}

module.exports = { question, close };
