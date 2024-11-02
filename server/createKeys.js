const {modularExponentiation} = require('./calculations.js'); 

function handler(req, res) {
    // Создаём ключи
    const { privateKey, openKey } = createSign();
    // Преобразование в JSON
    const jsonKeys = JSON.stringify({ privateKey, openKey });
    return jsonKeys;
}
function createSign() {
    // Модуль
    const mod = 113;
    // Основание, генератор группы
    const base = 5;
    // Закрытый ключ
    const privateKey = Math.floor(Math.random() * mod);
    // Открытй ключ
    const openKey = modularExponentiation(base, privateKey, mod);

    return { privateKey, openKey };
}

module.exports = handler; // Экспортируем только handler