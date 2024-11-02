// Алгоритм Евклида
function checkSignature(openKey, signature, hash) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

module.exports = checkSignature;