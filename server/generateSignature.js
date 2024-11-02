// Импортируем функции
const {modularExponentiation, gcd} = require('./calculations.js'); 

function generateSignature(openKey, privateKey, hash) {
    // Преобразуем строку в число (BigInt)
    const bigIntNumber = BigInt("0x" + hash);

    const o = Number(openKey);
    const c = Number(privateKey);
    
    // Модуль
    const mod = 113;
    // Основание, генератор группы
    const base = 5;
    // Текст
    const m = Number(bigIntNumber) % mod;
    
    // Случайное число 
    let k;

    do {
        // Генерируем случайное число в диапазоне от 0 до mod
        k = Math.floor(Math.random() * (mod - 1));
    } while (gcd(k, mod - 1) !== 1); // Проверяем, что НОД равен 1

    let r = modularExponentiation(base, k, mod);//'base ^ k';
    let s = modularExponentiation(k, mod -2, mod-1) * (m - c * r); //'k ^ -1 * (m - privateKey * r) mod (p-1)'
    s = s % (mod - 1);
    s = s > 0 ? s : s + (s * Math.ceil(mod / s)); 
    return [r, s];
}

module.exports = generateSignature; // Экспортируем только handler