const {
    modularExponentiation,
    isPrimitiveRoot,
    sieveOfEratosthenesW2,
    findTheNearestLessPrimitiveRoot,
    isPrimitive
} = require('./calculations.js');

const low_limit = 225000000;
const high_limit = 425000000;

function handler(req, res) {
    // Создаём ключи
    const { privateKey, openKey } = createKeys();
    // Преобразование в JSON
    const jsonKeys = JSON.stringify({ privateKey, openKey });
    return jsonKeys;
}

function createKeys() {
    // Ищем случайное простое число для модуля
    let randomN = Math.floor(low_limit + (high_limit - low_limit) * Math.random());
    
    while(!isPrimitive(randomN))
        --randomN;
    const mod = randomN;
    
    // Основание, генератор группы, первообразный корень
    let base = Math.floor(mod/2 - 1 + mod/2 * Math.random());//findTheNearestLessPrimitiveRoot(Math.floor(mod/2 - 1 + mod/2 * Math.random()), mod);
    // Закрытый ключ
    const privateKey = Math.floor(Math.random() * mod);
    // Открытй ключ
    const openKey = modularExponentiation(base, privateKey, mod);

    return { 
        privateKey,
        openKey: {openKey, base, mod} 
    };
}

module.exports = handler; // Экспортируем только handler