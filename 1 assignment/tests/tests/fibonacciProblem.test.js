const {fibonacciProblem} = require("../index");

it('should throw RangeError when n is 0', () => {
    // Given
    const n = 1;

    // When
    const testFunction = () => fibonacciProblem(n);

    // Then
    expect(testFunction).toThrow(RangeError);
});

it('should return 1 when n is 1', () => {
    // Given
    const n = 1;

    // When
    const result = fibonacciProblem(n);

    // Then
    expect(result).toBe(1);
});

it('should return 1 when n is 1', () => {
    // Given
    const n = 1;

    // When
    const result = fibonacciProblem(n);

    // Then
    expect(result).toBe(1);
});

it('should return 1 when n is 2', () => {
    // Given
    const n = 2;

    // When
    const result = fibonacciProblem(n);

    // Then
    expect(result).toBe(1);
});

it('should throw TypeError when n is not a number', () => {
    // Given
    const n = 'not a number';

    // When
    const testFunction = () => fibonacciProblem(n);

    // Then
    expect(testFunction).toThrow(TypeError);
});

it('should throw RangeError when n is not a positive integer', () => {
    // Given
    const n = -5;

    // When
    const testFunction = () => fibonacciProblem(n);

    // Then
    expect(testFunction).toThrow(RangeError);
});
