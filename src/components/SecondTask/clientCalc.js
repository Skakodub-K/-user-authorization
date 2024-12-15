//const { seedrandom } = require("seedrandom");

// Подключаем библиотеку mathjs
const math = require('mathjs');

// Размер пространства
const n = 13;

function createOpenKey(password) {
    const privateKey = createPrivateKey(password, n);
    // Ищем самый маленький базисный вектор
    let smallSize = privateKey.B[0][0];
    for (let i = 1; i < privateKey.B.length; ++i) {
        smallSize = smallSize > privateKey.B[i][i] ? privateKey.B[i][i] : smallSize;
    }
    
    console.log('smallSize: ', smallSize);
    
    return { 
        //B' = U * B
        BO: math.multiply(privateKey.U, privateKey.B),
        r : Math.floor(smallSize / 2)
    };
}

// Получить закрытый ключ
function createPrivateKey(password, n) {
    const privateKey = {
        B: createOrtogMatrix(n, password),
        U: randomUnimodularMatrix(n, password, 3, 6)
    }
    console.log('Унимодулярная матрица: ', privateKey.U);
    console.log('Её детерминант: ', math.det(privateKey.U));
    
    return privateKey;
}

// Функция для создания псевдослучайной ортогональной матрицы
function createOrtogMatrix(n, seed) {
    const seedrandom = require('seedrandom');

    // Инициализируем генератор случайных чисел с помощью seed
    const randomGenerator = seedrandom(seed);

    // Создем массив пустой размером n * n
    let matrix = math.zeros(n, n).toArray();
    for (let i = 0; i < n; i++) {
        // Заполняем матрицу случайными числами
        matrix[i][i] = Math.floor(randomGenerator() * 100);
    }
    return matrix;
}

// Функция для создания псевдослучайной унимодулярной матрицы
function randomUnimodularMatrix(n, seed, operationCount, maxMultiplier) {
    const seedrandom = require('seedrandom');

    // Инициализируем генератор случайных чисел с помощью seed
    const randomGenerator = seedrandom(seed);

    // Начнем с единичной матрицы
    let A = math.identity(n).toArray();

    for (let _ = 0; _ < Math.floor(operationCount); ++_) {
        // Случайно выберем тип преобразования
        const transformType = ['swap', 'negate', 'add'][Math.floor(randomGenerator() * 3)];

        // Случайно выберем индексы строк или столбцов
        let i = Math.floor(randomGenerator() * n);
        let j = Math.floor(randomGenerator() * n);
        while (i == j)
            j = Math.floor(randomGenerator() * n);

        let k = Math.floor(randomGenerator() * maxMultiplier);

        if (transformType === 'swap') {
            // Меняем местами строки или столбцы
            if (randomGenerator() < 0.5) {
                [A[i], A[j]] = [A[j], A[i]];
            } else {
                for (let l = 0; l < n; ++l) {
                    [A[l][i], A[l][j]] = [A[l][j], A[l][i]];
                }
            }
        } else if (transformType === 'negate') {
            // Умножаем строку или столбец на -1
            if (randomGenerator() < 0.5) {
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
            if (randomGenerator < 0.5) {
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

function decryptCiphr(ciphr, password) {
    const privateKey = createPrivateKey(password, n);

    let Binverse;
    let Uinverse;

    try {
        Binverse = math.inv(privateKey.B);
        Uinverse = math.inv(privateKey.U);
    } catch (error) {
        throw new Error('Невозможно найти обратную матрицу.');
    }

    //ciphr * B-1
    const ce = math.multiply(ciphr, Binverse);
    //округляем ce
    const rc = ce.map((value) => Math.round(value));
    //получаем m = rc * U-1
    return math.multiply(rc, Uinverse);
}

module.exports = {
    createOpenKey,
    decryptCiphr
};