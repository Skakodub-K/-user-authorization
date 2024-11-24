// Импортируем функции
const {modularExponentiation} = require('./calculations.js'); 

// Проверка подписи
function checkSignature(openKey, g, mod, r, s, hash) {
    r = Number(r);
    s = Number(s);
    // Преобразуем строку в число (BigInt)
    const bigIntNumber = BigInt("0x" + hash);   
    // Модуль
    mod = Number(mod);
    // Основание, генератор группы
    g = Number(g);

    const y = openKey % mod;
    const m =  Number(bigIntNumber) % mod;
    
    const leftSide = (modularExponentiation(y, r, mod) * modularExponentiation(r, s, mod)) % mod;
    const rightSide = modularExponentiation(g, m, mod);
    return leftSide === rightSide;
}

module.exports = checkSignature;