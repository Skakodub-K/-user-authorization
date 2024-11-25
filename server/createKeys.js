const {
    modularExponentiation,
    isPrimitiveRoot,
    sieveOfEratosthenesW2
} = require('./calculations.js');

const low_limit = 225000;
const high_limit = 425000;

function handler(req, res) {
    // Создаём ключи
    const { privateKey, openKey } = createKeys();
    // Преобразование в JSON
    const jsonKeys = JSON.stringify({ privateKey, openKey });
    return jsonKeys;
}

function createKeys() {
    // Ищем случайное простое число для модуля
    const randomN = Math.floor(low_limit + (high_limit - low_limit) * Math.random());
    // Получаем решето
    const sieve = sieveOfEratosthenesW2(randomN);
    // Модуль
    let mod = 0;
    for (let i = sieve.length-1; i > 0; i--) {
        if (sieve[i]) {
            mod = i * 2 + 3;
            break;
        }
    }
    // Основание, генератор группы, первообразный корень
    let base =  Math.floor(mod/2 - 1 + mod/2 * Math.random());
    while(!isPrimitiveRoot(base, mod))
        base = (base + 1) % mod;
    // Закрытый ключ
    const privateKey = Math.floor(Math.random() * mod);
    // Открытй ключ
    const openKey = modularExponentiation(base, privateKey, mod);

    return { 
        privateKey,
        openKey: {openKey,base, mod} 
    };
}

module.exports = handler; // Экспортируем только handler