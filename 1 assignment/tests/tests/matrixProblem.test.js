const {matrixProblem} = require("../index");

it('should return a transposed matrix when a valid 2D array is passed as argument', () => {
    // Arrange
    const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    // Act
    const result = matrixProblem(matrix);

    // Assert
    expect(result).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]]);
});

it('should return a transposed matrix when a valid 2D array is passed as argument', () => {
    // Arrange
    const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    // Act
    const result = matrixProblem(matrix);

    // Assert
    expect(result).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]]);
});

it('should return a transposed matrix when a 1x1 matrix is passed as argument', () => {
    // Arrange
    const matrix = [[1]];

    // Act
    const result = matrixProblem(matrix);

    // Assert
    expect(result).toEqual([[1]]);
});

it('should throw a TypeError when a non-array argument is passed', () => {
    // Arrange
    const matrix = "not an array";

    // Act & Assert
    expect(() => matrixProblem(matrix)).toThrow(TypeError);
});

it('should throw a TypeError when an empty array is passed', () => {
    // Arrange
    const matrix = [];

    // Act & Assert
    expect(() => matrixProblem(matrix)).toThrow(TypeError);
});

it('should throw a TypeError when a jagged array is passed', () => {
    // Arrange
    const matrix = [[1, 2, 3], [4, 5], [6, 7, 8]];

    // Act & Assert
    expect(() => matrixProblem(matrix)).toThrow(TypeError);
});
