const {abProblem} = require("../index");

it('should return the sum of two positive integers', () => {
    expect(abProblem(2, 3)).toBe(5);
});

it('should return the sum of two negative integers', () => {
    expect(abProblem(-2, -3)).toBe(-5);
});

it('should return the sum of a positive and a negative integer', () => {
    expect(abProblem(2, -3)).toBe(-1);
});
