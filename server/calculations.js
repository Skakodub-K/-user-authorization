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

// Алгоритм Евклида
function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Расширенный Алгоритм Евклида
function extendedGCD(a, b) {
    let s = 0, old_s = 1;
    let t = 1, old_t = 0;
    let r = b, old_r = a;

    while (r !== 0) {
        const quotient = Math.floor(old_r / r);
        let temp = r;
        r = old_r - quotient * r;
        old_r = temp;
        
        temp = s;
        s = old_s - quotient * s;
        old_s = temp;
        
        temp = t;
        t = old_t - quotient * t;
        old_t = temp;
    }

    return { gcd: old_r, x: old_s, y: old_t };
}

module.exports = {
    modularExponentiation,
    gcd,
    extendedGCD
};