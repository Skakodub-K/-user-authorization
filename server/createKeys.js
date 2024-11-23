const {modularExponentiation} = require('./calculations.js'); 
const {
    isPrimitiveRoot,
    sieveOfEratosthenes
} = require('./calculations.js');

function handler(req, res) {
    // Создаём ключи
    const { privateKey, openKey } = createKeys();
    // Преобразование в JSON
    const jsonKeys = JSON.stringify({ privateKey, openKey });
    return jsonKeys;
}

function createKeys() {
    // Ищем случайное простое число для модуля
    const randomN = Math.floor(10000 + (30000 - 10000) * Math.random());
    // Получаем решето
    const sieve = sieveOfEratosthenes(randomN);
    // Модуль
    let mod = 0;
    for (let i = sieve.length-1; i > 0; i--) {
        if (sieve[i]) {
            mod = i;
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