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

// Решето Эратосфена
function sieveOfEratosthenes(n) {
    // заполняем решето единицами
    const sieve = Array(n).fill(true);
    // 0 и 1 - не простые числа
    sieve[0] = false;
    sieve[1] = false;

    /*
    Можно зачеркивать, начиная сразу с числа p2, потому что все меньшие числа,
    кратные p, обязательно имеют простой делитель меньше p,
    и они уже будут зачеркнуты к этому времени. 
    И, соответственно, останавливать алгоритм можно,
    когда p2 станет больше, чем n.
    */
     
    // Вычеркнем кратные 2
    for (let l = 4; l <= n; l += 2) {
        sieve[l] = false;
    }
    /*
    Кроме того, все простые числа, кроме 2, — нечётные числа,
    и поэтому для них можно считать шагами по 2p, начиная с p2.
    */

    for (let p = 3; p * p <= n; p++) {
        // если k - простое (не вычеркнуто)
        if (sieve[p]) {
            // то вычеркнем кратные k
            for (let l = p * p; l <= n; l += 2*p) {
                sieve[l] = false;
            }
        }
    }
    return sieve;
}

// Решето Эратосфена без четных чисел
function sieveOfEratosthenesW2(n) {
    // заполняем решето единицами
    const sieve = Array(Math.floor(n/2)).fill(true);

    /*
    Можно зачеркивать, начиная сразу с числа p2, потому что все меньшие числа,
    кратные p, обязательно имеют простой делитель меньше p,
    и они уже будут зачеркнуты к этому времени. 
    И, соответственно, останавливать алгоритм можно,
    когда p2 станет больше, чем n.
    */

    for (let p = 0; ; p++) {
        let z = 3 + 2 * p;
        if (z * z >= sieve.length) 
            break;
        // если k - простое (не вычеркнуто)
        if (sieve[p]) {
            // то вычеркнем кратные k
            for (let l = p + (p + 1) * z; l < sieve.length; l += z) {
                sieve[l] = false;
            }
        }
    }
    return sieve;
}

function eulerPhi(n) {
    return n-1;
}

// Функция для проверки, является ли число g первообразным корнем по модулю m
function isPrimitiveRoot(g, m) {
    // Находим функцию эйлера от m
    let phiM = eulerPhi(m);
    // Простые делители phiM
    const primeFactors = [];

    // Находим простые делители phiM
    for (let factor = 2; factor * factor <= phiM; ++factor) {
        if (phiM % factor === 0) {
            primeFactors.push(factor);
            while (phiM % factor === 0) {
                phiM /= factor;
            }
        }
    }
    if (phiM > 1)
        primeFactors.push(phiM);

    // Проверяем, что g^(phiM/q) != 1 (mod m) для всех простых делителей q
    for (const q of primeFactors) {
        if (modularExponentiation(g, phiM / q, m) === 1)
            return false;
    }

    // Проверяем, что g^phiM == 1 (mod m)
    return modularExponentiation(g, phiM, m) === 1;
}

module.exports = {
    modularExponentiation,
    gcd,
    extendedGCD,
    sieveOfEratosthenes,
    sieveOfEratosthenesW2,
    isPrimitiveRoot
};