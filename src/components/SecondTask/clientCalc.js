//const { seedrandom } = require("seedrandom");

// Подключаем библиотеку mathjs
const math = require('mathjs');

function createOpenKey(password) {
    const privateKey = createPrivateKey(password);
    //B' = U * B
    return math.multiply(privateKey.U, privateKey.B);
}

//
function createPrivateKey(password) {
    return {
        B: [
            [7, 0],
            [0, 3]
        ],//createNonSingularMatrix(2, password),
        U: [
            [2, 3],
            [3, 5]
        ]
    };
}

// Шифруем текст
function encryptText(text, password) {
    return text;
}

// Считаем детермминант
function determinant(matrix) {
    // Проверка, что матрица квадратная
    if (!Array.isArray(matrix) || !matrix.every(row => row.length === matrix.length)) {
        throw new Error("Матрица должна быть квадратной.");
    }

    const order = matrix.length;

    // Базовый случай: если матрица 1x1, возвращаем единственный элемент
    if (order === 1) {
        return matrix[0][0];
    }

    // Базовый случай: если матрица 2x2, используем формулу для 2x2
    if (order === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    // Разложение Лапласа по первой строке
    let det = 0;
    for (let i = 0; i < order; i++) {
        // Копируем матрицу без первого элемента и i-го столбца
        const subMatrix = matrix.slice(1).map(row => row.filter((_, j) => j !== i));

        // Умножаем элемент на определитель подматрицы и добавляем со знаком (-1)^(i+1)
        det += (i % 2 === 0 ? 1 : -1) * matrix[0][i] * determinant(subMatrix);
    }

    return det;
}

// Перемножение матриц
function multiplyMatrices(matrixA, matrixB) {
    if(matrixA.length === 1) {

    }
    
    // Проверка на совместимость матриц для перемножения
    if (matrixA[0].length !== matrixB.length) {
        throw new Error("Количество столбцов первой матрицы должно равняться количеству строк второй матрицы.");
    }

    const result = [];

    for (let i = 0; i < matrixA.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrixB[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < matrixA[0].length; k++) {
                sum += matrixA[i][k] * matrixB[k][j];
            }
            result[i][j] = sum;
        }
    }

    return result;
}

// Функция для создания псевдослучайной невырожденной матрицы
function createNonSingularMatrix(n, seed) {
    // Local PRNG: does not affect Math.random.
    var seedrandom = require('seedrandom');
    var randomGenerator = seedrandom(seed);
    
    // Инициализируем генератор случайных чисел с помощью seed
    //const randomGenerator = seedrandom(seed);

    let matrix;
    //do {
        // Создаем массив размером n x n
        matrix = Array.from({ length: n }, () => Array.from({ length: n }));

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                // Заполняем матрицу случайными числами
                matrix[i][j] = Math.floor(randomGenerator() * 100);
            }
        }

        // Проверяем, что матрица невырожденная
        if (determinant(matrix) == 0)
            console.error("Matrix is singular!");
            
        //} while (!isNonSingular(matrix));

    return matrix;
}

function decryptCiphr(ciphr, password) {
    const privateKey = createPrivateKey(password);
    
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
    const rc = ce;
    //получаем m = rc * U-1
    return math.multiply(rc, Uinverse);
}

module.exports = {
    createOpenKey,
    encryptText,
    decryptCiphr
};