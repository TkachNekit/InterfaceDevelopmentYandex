const {ticTacToeProblem} = require("../index");

describe('ticTacToeProblem', () => {

    // Returns "x" if the first row is filled with "x"
    it('should return "x" when the first row is filled with "x"', () => {
        const field = [["x", "x", "x"], ["o", "o", ""], ["", "", ""]];
        expect(ticTacToeProblem(field)).toBe("x");
    });

    // Returns "o" if the first column is filled with "o"
    it('should return "o" when the first column is filled with "o"', () => {
        const field = [["o", "x", ""], ["o", "x", ""], ["o", "", ""]];
        expect(ticTacToeProblem(field)).toBe("o");
    });

    // Returns "x" if the diagonal from top left to bottom right is filled with "x"
    it('should return "x" when the diagonal from top left to bottom right is filled with "x"', () => {
        const field = [["x", "", ""], ["", "x", ""], ["", "", "x"]];
        expect(ticTacToeProblem(field)).toBe("x");
    });

    // Returns "x" if the second row is filled with "x"
    it('should return "x" when the second row is filled with "x"', () => {
        const field = [["o", "", ""], ["x", "x", "x"], ["o", "", ""]];
        expect(ticTacToeProblem(field)).toBe("x");
    });

    // Returns "o" if the second column is filled with "o"
    it('should return "o" when the second column is filled with "o"', () => {
        const field = [["x", "o", ""], ["", "o", ""], ["x", "o", ""]];
        expect(ticTacToeProblem(field)).toBe("o");
    });

    // Returns "x" if the diagonal from bottom left to top right is filled with "x"
    it('should return "x" when the diagonal from bottom left to top right is filled with "x"', () => {
        const field = [["", "", "x"], ["", "x", ""], ["x", "", ""]];
        expect(ticTacToeProblem(field)).toBe("x");
    });

    // Returns "o" if the diagonal from top right to bottom left is filled with "o"
    it('should return "o" when the diagonal from top right to bottom left is filled with "o"', () => {
        const field = [["o", "", ""], ["", "o", ""], ["", "", "o"]];
        expect(ticTacToeProblem(field)).toBe("o");
    });

    // Returns "draw" if all cells are filled and there is no winner
    it('should return "draw" when all cells are filled and there is no winner', () => {
        const field = [["x", "o", "x"], ["x", "o", "o"], ["o", "x", "x"]];
        expect(ticTacToeProblem(field)).toBe("draw");
    });

    // Returns "o" if the diagonal from bottom right to top left is filled with "o"
    it('should return "o" when the diagonal from bottom right to top left is filled with "o"', () => {
        const field = [["", "", "o"], ["", "o", ""], ["o", "", ""]];
        expect(ticTacToeProblem(field)).toBe("o");
    });

});
