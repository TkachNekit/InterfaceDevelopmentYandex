const {centuryByYearProblem} = require("../index");

it('should return the correct century for the year 1', () => {
    expect(centuryByYearProblem(1)).toBe(1);
});

it('should return 1 for the year 0', () => {
    expect(centuryByYearProblem(0)).toBe(1);
});

it('should return the correct century for the year that is a multiple of 100', () => {
    expect(centuryByYearProblem(100)).toBe(1);
    expect(centuryByYearProblem(200)).toBe(2);
    expect(centuryByYearProblem(300)).toBe(3);
});

it('should return the correct century for the year that is not a multiple of 100', () => {
    expect(centuryByYearProblem(101)).toBe(2);
    expect(centuryByYearProblem(202)).toBe(3);
    expect(centuryByYearProblem(303)).toBe(4);
});

it('should throw a TypeError if the year is not a number', () => {
    expect(() => centuryByYearProblem("2020")).toThrow(TypeError);
    expect(() => centuryByYearProblem(true)).toThrow(TypeError);
    expect(() => centuryByYearProblem(null)).toThrow(TypeError);
});

it('should return 1 when the year is 0', () => {
    expect(centuryByYearProblem(0)).toBe(1);
});

it('should throw a RangeError when the year is negative', () => {
    expect(() => centuryByYearProblem(-1)).toThrow(RangeError);
});
