// Indi ko maligo kung lamig ang tubig.
// Pero kung indi lamig kag may tubig,
// maligo ko.

function mood() {
    let hasWater = true;
    let isCold = true;

    if (hasWater && !isCold) {
        console.log("Maligo ko!");
    } else {
        console.log("Indi ko maligo.");
    }
}

mood();