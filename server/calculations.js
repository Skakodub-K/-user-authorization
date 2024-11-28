// Алгоритм быстрого возведения в степень с большими числами
function modularExponentiation(base, exponent, mod) {
  // Любая база взятая по модулю 1 равна 0
  if (mod === BigInt(1)) return BigInt(0);

  // Начальное значение
  let result = BigInt(1);

  // Уменьшаем базу по модулю
  base = base % mod;

  while (exponent > BigInt(0)) {
    // Если степень нечётная, умножаем результат на базу
    if (exponent % BigInt(2) === BigInt(1)) result = (result * base) % mod;

    // Умножаем базу сама на себя
    base = (base * base) % mod;

    // Уменьшаем степень вдвое
    exponent = exponent / BigInt(2);
  }

  return result;
}

// Алгоритм Евклида для больших чисел
function gcd(a, b) {
  while (b !== BigInt(0)) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Расширенный алгоритм Евклида для больших чисел
function extendedGCD(a, b) {
  let s = BigInt(0),
    old_s = BigInt(1);
  let t = BigInt(1),
    old_t = BigInt(0);
  let r = b,
    old_r = a;

  while (r !== BigInt(0)) {
    const quotient = old_r / r;
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

// Решето Эратосфена для больших чисел
function sieveOfEratosthenes(n) {
  // заполняем решето единицами
  const sieve = Array(n).fill(true);
  // 0 и 1 - не простые числа
  sieve[0] = false;
  sieve[1] = false;

  for (let l = 4; l <= n; l += 2) {
    sieve[l] = false;
  }

  for (let p = 3; p * p <= n; p++) {
    if (sieve[p]) {
      for (let l = p * p; l <= n; l += 2 * p) {
        sieve[l] = false;
      }
    }
  }
  return sieve;
}

// Решето Эратосфена без четных чисел для больших чисел
function sieveOfEratosthenesW2(n) {
  const sieve = Array(Math.floor(n / 2)).fill(true);

  for (let p = 0; ; p++) {
    let z = 3 + 2 * p;
    if (z * z >= sieve.length) break;
    if (sieve[p]) {
      for (let l = p + (p + 1) * z; l < sieve.length; l += z) {
        sieve[l] = false;
      }
    }
  }
  return sieve;
}

function isPrimitive(n) {
  n = BigInt(n); // Now we can safely convert n to BigInt

  // Check for prime using BigInt
  if (n < BigInt(2)) {
    return false; // 0 and 1 are not prime numbers
  }

  for (let i = 2; i <= Math.sqrt(Number(n)); ++i) {
    if (Number(n) % i === 0) {
      return false; // Found a divisor, not prime
    }
  }
  return true; // No divisors found, n is prime
}
function eulerPhi(n) {
  return n - BigInt(1);
}

// Ищем простые делители m
function findSimpleDivisors(m) {
  let phiM = eulerPhi(m);
  const primeFactors = [];

  for (let factor = BigInt(2); factor * factor <= phiM; ++factor) {
    if (phiM % factor === BigInt(0)) {
      primeFactors.push(factor);
      while (phiM % factor === BigInt(0)) {
        phiM /= factor;
      }
    }
  }
  if (phiM > BigInt(1)) primeFactors.push(phiM);
  return { primeFactors, phiM };
}

// Проверка, является ли число g первообразным корнем по модулю m
function isPrimitiveRoot(g, primeFactorsAndPhiM, module) {
  const primeFactors = primeFactorsAndPhiM.primeFactors;
  const phiM = primeFactorsAndPhiM.phiM;

  for (const q of primeFactors) {
    if (modularExponentiation(g, phiM / q, module) === BigInt(1)) return false;
  }

  return modularExponentiation(g, phiM, module) === BigInt(1);
}

// Найти ближайший меньший примитвный корень числа g
function findTheNearestLessPrimitiveRoot(g, module) {
  const simpleDivisors = findSimpleDivisors(module);
  while (!isPrimitiveRoot(g, simpleDivisors, module) || g === BigInt(0))
    g = g - BigInt(1);
  return g;
}

module.exports = {
  modularExponentiation,
  gcd,
  extendedGCD,
  sieveOfEratosthenes,
  sieveOfEratosthenesW2,
  isPrimitive,
  isPrimitiveRoot,
  findTheNearestLessPrimitiveRoot,
};
