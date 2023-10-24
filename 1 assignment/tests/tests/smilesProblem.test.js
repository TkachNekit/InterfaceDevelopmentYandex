const {smilesProblem} = require("../index");

describe('smilesProblem', () => {

    // returns 0 when there are no smileys in the text
    it('should return 0 when there are no smileys in the text', () => {
        const result = smilesProblem("This is a test");
        expect(result).toBe(0);
    });

    // returns 1 when there is one smiley in the text
    it('should return 1 when there is one smiley in the text', () => {
        const result = smilesProblem("This is a test :-)");
        expect(result).toBe(1);
    });

    // returns the correct number of smileys when there are multiple smileys in the text
    it('should return the correct number of smileys when there are multiple smileys in the text', () => {
        const result = smilesProblem("This is a test :-) :-)");
        expect(result).toBe(2);
    });

    // throws a TypeError when the argument is not a string
    it('should throw a TypeError when the argument is not a string', () => {
        expect(() => {
            smilesProblem(123);
        }).toThrow(TypeError);
    });

    // returns 0 when the argument is an empty string
    it('should return 0 when the argument is an empty string', () => {
        const result = smilesProblem("");
        expect(result).toBe(0);
    });

    // returns 0 when the argument is a string without smileys
    it('should return 0 when the argument is a string without smileys', () => {
        const result = smilesProblem("This is a test");
        expect(result).toBe(0);
    });

    // returns 0 when there are no smileys in the text
    it('should return 0 when there are no smileys in the text', () => {
        const result = smilesProblem("This is a test");
        expect(result).toBe(0);
    });

    // returns the correct number of smileys when there are multiple smileys in the text
    it('should return the correct number of smileys when there are multiple smileys in the text', () => {
        const result = smilesProblem("Hello :-) How are you? (-:");
        expect(result).toBe(2);
    });

});
