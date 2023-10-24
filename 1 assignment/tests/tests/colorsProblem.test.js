const {colorsProblem} = require("../index");

it('should return RGB format when valid HEX color is provided', () => {
    // Arrange
    const hexColor = "#FFFFFF";

    // Act
    const result = colorsProblem(hexColor);

    // Assert
    expect(result).toBe("(255, 255, 255)");
});

it('should accept lowercase and uppercase HEX color strings', () => {
    // Arrange
    const hexColor1 = "#ffffff";
    const hexColor2 = "#FFFFFF";

    // Act
    const result1 = colorsProblem(hexColor1);
    const result2 = colorsProblem(hexColor2);

    // Assert
    expect(result1).toBe("(255, 255, 255)");
    expect(result2).toBe("(255, 255, 255)");
});

it('should return RGB format for minimum HEX color value', () => {
    // Arrange
    const hexColor = "#000000";

    // Act
    const result = colorsProblem(hexColor);

    // Assert
    expect(result).toBe("(0, 0, 0)");
});

it('should throw TypeError for non-string input', () => {
    // Arrange
    const hexColor = 123;

    // Act & Assert
    expect(() => colorsProblem(hexColor)).toThrow(TypeError);
});

it('should throw RangeError for invalid HEX color format', () => {
    // Arrange
    const hexColor = "#GGGGGG";

    // Act & Assert
    expect(() => colorsProblem(hexColor)).toThrow(RangeError);
});

it('should return RGB format when maximum HEX color value is provided', () => {
    // Arrange
    const hexColor = "#FFFFFF";

    // Act
    const result = colorsProblem(hexColor);

    // Assert
    expect(result).toBe("(255, 255, 255)");
});

it('should throw RangeError when HEX color value greater than "#FFFFFF" is provided', () => {
    // Arrange
    const hexColor = "#FFFFFFF";

    // Act and Assert
    expect(() => colorsProblem(hexColor)).toThrow(RangeError);
});

it('should throw RangeError when invalid HEX color length is provided', () => {
    // Arrange
    const hexColor = "#FFFFF";

    // Act and Assert
    expect(() => colorsProblem(hexColor)).toThrow(RangeError);
});
