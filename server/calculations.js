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

  if (Number(n) % 2 === 0)
    return false; // Found a divisor, not prime

  for (let i = 3; i <= Math.sqrt(Number(n)); i+=2) {
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

function random_unimodular_matrix(n, operationCount, maxMultiplier) {
  // Начнем с единичной матрицы
  let A = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; ++i) {
    A[i][i] = 1;
  }

  for (let _ = 0; _ < Math.floor(operationCount); ++_) {
    // Случайно выберем тип преобразования
    // TODO:
    const transformType = ['swap', 'negate', 'add'][Math.floor(Math.random() * 3)];

    // Случайно выберем индексы строк или столбцов
    let i = Math.floor(Math.random() * n);
    let j = Math.floor(Math.random() * n);
    while(i == j)
      j = Math.floor(Math.random() * n);

    /// TODO
    let k = Math.floor(Math.random() * n) * maxMultiplier;

    if (transformType === 'swap') {
      // Меняем местами строки или столбцы
      if (Math.random() < 0.5) {
        [A[i], A[j]] = [A[j], A[i]];
      } else {
        for (let l = 0; l < n; ++l) {
          [A[l][i], A[l][j]] = [A[l][j], A[l][i]];
        }
      }
    } else if (transformType === 'negate') {
      // Умножаем строку или столбец на -1
      if (Math.random() < 0.5) {
        for (let l = 0; l < n; ++l) {
          A[i][l] *= -1;
        }
      } else {
        for (let l = 0; l < n; ++l) {
          A[l][i] *= -1;
        }
      }
    } else if (transformType === 'add') {
      // Добавляем одну строку (или столбец) к другой, умноженную на k
      if (Math.random() < 0.5) {
        for (let l = 0; l < n; ++l) {
          A[i][l] += k * A[j][l];
        }
      } else {
        for (let l = 0; l < n; ++l) {
          A[l][i] += k * A[l][j];
        }
      }
    }
  }
  return A;
}

// Функция для нахождения определителя матрицы
function determinant(matrix) {
  // Проверка, является ли матрица квадратной
  if (!isSquareMatrix(matrix)) {
    throw new Error("Матрица должна быть квадратной.");
  }

  // Если матрица 1x1, то её определитель равен единственному элементу
  if (matrix.length == 1)
    return matrix[0][0];

  // Если матрица 2x2, то используем формулу для вычисления определителя
  if (matrix.length == 2)
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

  // Для матриц большего размера используем метод разложения по первой строке
  let det = 0;
  for (let i = 0; i < matrix.length; i++) {
    // Создаем подматрицу, исключая первую строку и i-й столбец
    let subMatrix = getSubMatrix(matrix, 0, i);

    // Вычисляем определитель подматрицы рекурсивно
    let minorDet = determinant(subMatrix);

    // Добавляем вклад текущего элемента в общий определитель
    det += ((i % 2 == 0 ? 1 : -1) * matrix[0][i] * minorDet);
  }

  return det;
}

// Вспомогательная функция для проверки, является ли матрица квадратной
function isSquareMatrix(matrix) {
  if (matrix.length === 0) {
    return false;
  }

  for (let row of matrix) {
    if (row.length !== matrix.length) {
      return false;
    }
  }

  return true;
}

// Вспомогательная функция для создания подматрицы
function getSubMatrix(matrix, excludeRow, excludeCol) {
  let subMatrix = [];

  for (let i = 0; i < matrix.length; i++) {
    if (i != excludeRow) {
      let row = [];

      for (let j = 0; j < matrix[i].length; j++) {
        if (j != excludeCol)
          row.push(matrix[i][j]);
      }

      subMatrix.push(row);
    }
  }

  return subMatrix;
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
  random_unimodular_matrix,
  determinant
};
