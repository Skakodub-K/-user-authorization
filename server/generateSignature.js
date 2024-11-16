// Импортируем функции
const {modularExponentiation, gcd, extendedGCD} = require('./calculations.js'); 

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
    const gcdXY = extendedGCD(k, mod - 1);
    const rK = gcdXY.x;//k ^ -1
    let s = rK * (m - c * r); //'k ^ -1 * (m - privateKey * r) mod (p-1)'
    s = s % (mod - 1);
    s = s > 0 ? s : s + (mod - 1); 
    return [r, s];
}

module.exports = generateSignature; // Экспортируем только handler