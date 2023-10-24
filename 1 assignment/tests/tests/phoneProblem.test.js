const {phoneProblem} = require("../index");

describe('phoneProblem', () => {

    // returns true for valid phone number "8-800-123-45-67"
    it('should return true when the phone number is valid', () => {
        expect(phoneProblem("8-800-123-45-67")).toBe(true);
    });

    // returns true for valid phone number "8-800-999-99-99"
    it('should return true when the phone number is valid', () => {
        expect(phoneProblem("8-800-999-99-99")).toBe(true);
    });

    // returns true for valid phone number "8-800-000-00-00"
    it('should return true when the phone number is valid', () => {
        expect(phoneProblem("8-800-000-00-00")).toBe(true);
    });

    // throws TypeError for phoneNumber not being a string
    it('should throw TypeError when phoneNumber is not a string', () => {
        expect(() => phoneProblem(123)).toThrow(TypeError);
    });

    // returns false for invalid phone number "8-800-123-45-6"
    it('should return false when the phone number is invalid', () => {
        expect(phoneProblem("8-800-123-45-6")).toBe(false);
    });

    // returns false for invalid phone number "8-800-123-45-678"
    it('should return false when the phone number is invalid', () => {
        expect(phoneProblem("8-800-123-45-678")).toBe(false);
    });

});
