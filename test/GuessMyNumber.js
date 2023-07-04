const assert = chai.assert;
// const { joinArr, checkErrors, handleLowerOrHigher } = require('./../script.js');

describe('Guessing Game', () => {
  describe('joinArr', () => {
    it('Return a string from a joined array', () => {
      const expected = 'Between ( 1 and 100)';
      const actual = joinArr(['Between (', '1', 'and', '100)']);
      assert.equal(expected, actual);
    });
  });

  describe('checkErrors', () => {
    it('Return true for invalid data(The guess is greater than the range)', () => {
      const expected = true;
      const actual = checkErrors(150, ['Between (', '1', 'and', '100)']);
      assert.equal(expected, actual);
    });
    it('Return false for invalid data(The guess is lower than the range)', () => {
      const expected = false;
      const actual = checkErrors(10, ['Between (', '50', 'and', '100)']);
      assert.equal(expected, actual);
    });

    it('Return false for valid data', () => {
      const expected = false;
      const actual = checkErrors(10, ['Between (', '1', 'and', '100)']);
      assert.equal(expected, actual);
    });
  });

  describe('handleLowerOrHigher', () => {
    it('Return a string "👇 Too Low. Please type a number: Between ( 50 and 100)"', () => {
      const expected =
        '👇 Too Low. Please type a number: Between ( 50 and 100)';
      const actual = handleLowerOrHigher(
        true,
        ['Between (', '1', 'and', '100)'],
        50
      );
      assert.equal(expected, actual);
    });

    it('Return a string "☝️ Too High. Please type a number: Between ( 50 and 100)"', () => {
      const expected = '☝️ Too High. Please type a number: Between ( 1 and 50)';
      const actual = handleLowerOrHigher(
        false,
        ['Between (', '1', 'and', '100)'],
        50
      );
      assert.equal(expected, actual);
    });
  });
});
