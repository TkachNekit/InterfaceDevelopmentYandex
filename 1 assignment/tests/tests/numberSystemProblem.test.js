const {numberSystemProblem} = require("../index");

it('should return a string when passed a valid number and a valid target number system', () => {
    const result = numberSystemProblem(10, 2);
    expect(typeof result).toBe('string');
});

it('should return the correct string representation of the number in the target number system', () => {
    const result = numberSystemProblem(10, 2);
    expect(result).toBe('1010');
});

it('should throw a TypeError when passed arguments that are not numbers', () => {
    expect(() => numberSystemProblem('10', 2)).toThrow(TypeError);
    expect(() => numberSystemProblem(10, '2')).toThrow(TypeError);
});

it('should throw a TypeError when passed only one argument', () => {
    expect(() => numberSystemProblem(10)).toThrow(TypeError);
});

it('should throw a RangeError when passed a target number system less than 2', () => {
    expect(() => numberSystemProblem(10, 1)).toThrow(RangeError);
});
