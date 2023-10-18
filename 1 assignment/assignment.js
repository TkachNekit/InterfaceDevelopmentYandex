'use strict';

/**
 * Складывает два целых числа
 * @param {Number} a Первое целое
 * @param {Number} b Второе целое
 * @throws {TypeError} Когда в аргументы переданы не числа
 * @returns {Number} Сумма аргументов
 */
function abProblem(a, b) {
    if (Number.isInteger(a) && Number.isInteger(b)) {
        return a + b;
    } else {
        throw new TypeError;
    }

}

/**
 * Определяет век по году
 * @param {Number} year Год, целое положительное число
 * @throws {TypeError} Когда в качестве года передано не число
 * @throws {RangeError} Когда год – отрицательное значение
 * @returns {Number} Век, полученный из года
 */
function centuryByYearProblem(year) {
    if (!Number.isInteger(year)) {
        throw new TypeError;
    }
    if (year < 0) {
        throw new RangeError;
    }
    var result = Math.ceil(year / 100)
    if (year === 0) {
        result += 1
    }
    return result;
}


/**
 * Переводит цвет из формата HEX в формат RGB
 * @param {String} hexColor Цвет в формате HEX, например, '#FFFFFF'
 * @throws {TypeError} Когда цвет передан не строкой
 * @throws {RangeError} Когда значения цвета выходят за пределы допустимых
 * @returns {String} Цвет в формате RGB, например, '(255, 255, 255)'
 */
function colorsProblem(hexColor) {
    if (!(typeof hexColor === "string")) {
        throw new TypeError;
    }
    if (!/^#[0-9A-Fa-f]{6}$/.test(hexColor)) {
        throw new RangeError;
    }
    hexColor = hexColor.replace(/^#/, '');
    const bigint = parseInt(hexColor, 16);
    const r = parseInt(hexColor.slice(0, 2), 16);
    const g = parseInt(hexColor.slice(2, 4), 16);
    const b = parseInt(hexColor.slice(4, 6), 16);

    return `(${r}, ${g}, ${b})`;
}


/**
 * Находит n-ое число Фибоначчи
 * @param {Number} n Положение числа в ряде Фибоначчи
 * @throws {TypeError} Когда в качестве положения в ряде передано не число
 * @throws {RangeError} Когда положение в ряде не является целым положительным числом
 * @returns {Number} Число Фибоначчи, находящееся на n-ой позиции
 */
function fibonacciProblem(n) {
    if (!Number.isInteger(n)) {
        throw new TypeError;
    }
    if (n <= 0) {
        throw new RangeError;
    }
    let array = [0, 1]
    for (let i = 2; i <= n; i++) {
        array[i] = array[i - 1] + array[i - 2];
    }
    return array[n];
}


/**
 * Транспонирует матрицу
 * @param {(Any[])[]} matrix Матрица размерности MxN
 * @throws {TypeError} Когда в функцию передаётся не двумерный массив
 * @returns {(Any[])[]} Транспонированная матрица размера NxM
 */
function matrixProblem(matrix) {
    if (!is2DMatrix(matrix)) {
        throw new TypeError;
    }
    let n = matrix.length;
    let m = matrix[0].length;
    let newMatrix = [];
    for (let i = 0; i < m; i++) {
        newMatrix[i] = [];
    }

    for (let i = 0; i < m; i++) {
        let newRow = [];
        for (let j = 0; j < n; j++) {
            newRow[j] = matrix[j][i];
        }
        newMatrix[i] = newRow;
    }
    return newMatrix;
}

function is2DMatrix(matrix) {
    if (!Array.isArray(matrix) || matrix.length === 0) {
        return false;
    }
    for (let row of matrix) {
        if (!Array.isArray(row)) {
            return false;
        }
    }
    const numberOfCols = matrix[0].length;
    for (let row of matrix) {
        if (row.length !== numberOfCols) {
            return false;
        }
    }
    return true;
}

/**
 * Переводит число в другую систему счисления
 * @param {Number} n Число для перевода в другую систему счисления
 * @param {Number} targetNs Система счисления, в которую нужно перевести (Число от 2 до 36)
 * @throws {TypeError} Когда переданы аргументы некорректного типа
 * @throws {RangeError} Когда система счисления выходит за пределы значений [2, 36]
 * @returns {String} Число n в системе счисления targetNs
 */
function numberSystemProblem(n, targetNs) {
    if (typeof n !== "number" || !Number.isInteger(targetNs)) {
        throw new TypeError;
    }
    if (2 > targetNs || 36 < targetNs) {
        throw new RangeError;
    }
    return n.toString(targetNs);
}


/**
 * Проверяет соответствие телефонного номера формату
 * @param {String} phoneNumber Номер телефона в формате '8–800–xxx–xx–xx'
 * @throws {TypeError} Когда в качестве аргумента передаётся не строка
 * @returns {Boolean} Если соответствует формату, то true, а иначе false
 */
function phoneProblem(phoneNumber) {
    if (!(typeof (phoneNumber) === "string")) {
        throw new TypeError;
    }
    const regexPattern = /^8-800-\d{3}-\d{2}-\d{2}$/;
    return regexPattern.test(phoneNumber);

}


/**
 * Определяет количество улыбающихся смайликов в строке
 * @param {String} text Строка в которой производится поиск
 * @throws {TypeError} Когда в качестве аргумента передаётся не строка
 * @returns {Number} Количество улыбающихся смайликов в строке
 */
function smilesProblem(text) {
    if (!(typeof (text) === "string")) {
        throw new TypeError;
    }
    const regexPattern1 = /:-\)/g;
    const regexPattern2 = /\(-:/g;
    const matches = text.match(regexPattern1);
    const matchesReverse = text.match(regexPattern2);
    let total = 0;
    if (matches !== null) {
        total += matches.length;
    }
    if (matchesReverse !== null) {
        total += matchesReverse.length;
    }
    return total;
}


/**
 * Определяет победителя в игре "Крестики-нолики"
 * Тестами гарантируются корректные аргументы.
 * @param {(('x' | 'o')[])[]} field Игровое поле 3x3 завершённой игры
 * @returns {'x' | 'o' | 'draw'} Результат игры
 */
function ticTacToeProblem(field) {
    for (let r = 0; r < 3; r++) {
        if (field[r][0] === field[r][1] && field[r][0] === field[r][2]) {
            return field[r][0];
        }
        if (field[0][r] === field[1][r] && field[0][r] === field[2][r]) {
            return field[0][r]
        }
    }
    if (field[0][0] === field[1][1] && field[1][1] === field[2][2]) {
        return field[0][0];
    }
    if (field[0][2] === field[1][1] && field[1][1] === field[2][0]) {
        return field[1][1];
    }
    return "draw";
}


module.exports = {
    abProblem,
    centuryByYearProblem,
    colorsProblem,
    fibonacciProblem,
    matrixProblem,
    numberSystemProblem,
    phoneProblem,
    smilesProblem,
    ticTacToeProblem
};