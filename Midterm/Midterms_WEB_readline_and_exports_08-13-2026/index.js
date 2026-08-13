const input = require('./input');
const output = require('./sapapel');

async function primaryFn() {
    console.log("ano ni");

    const sabat = await input.question("ubra ta code.");

    if (sabat === "bwas lang") {
        output.linginUlo();
    } else {
        console.log("ambot");
    }

    input.close();
}

primaryFn();