export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.setHeader('Allow', ['POST']).status(405).end(`Метод ${req.method} не разрешен.`);

    try {
        // Создаём ключи
        const {privateKey, openKey} = createSign();
        return res.status(200).json({
            privateKey,
            openKey
        });
    } catch (error) {
        return res.status(500).json({ error: 'Ошибка при создании подписи.' });
    }
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
    
    return {privateKey, openKey};
}

// Алгоритм быстрого возведение в степень
// Метод повторяющихся возведения в квадрат и умножения
function modularExponentiation(base, exponent, mod) {
    // Любая база взятая по модулю 1 равна 0
    if (mod === 1)
        return 0;

    // Начальное значение
    let result = 1;

    // Уменьшаем базу по модулю
    base = base % mod;

    while (exponent > 0) {

        // Если степень нечётная, умножаем результат на базу
        if (exponent % 2 === 1)
            result = (result * base) % mod;

        // Умножаем базу сама на себя
        base = (base * base) % mod;

        // Уменьшаем степень вдвое
        exponent = Math.floor(exponent / 2);
    }

    return result;
}