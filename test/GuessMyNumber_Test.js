//Array of wrong guesses
const wrongGuesses = [];

/**
 *Change the array (Between,1,and,100) to (Between[0] 1[1] and[2] 100)[3]
 * @param {array} arr - The array of the range between max and min values
 * @returns string
 */
const joinArr = (arr) => arr.join(' ');

/**
 *Check for errors
 * @param {number} guess - User's guess
 * @param {array} range - Last value of the range
 * @returns - true if the data is invalid
 *          - false if the data is valid
 */
const checkErrors = (guess, range) => {
  const min = +range[1];
  const max = Number(range[3].replace(')', ''));

  if (wrongGuesses.length === 0) return !guess || guess < 0 || guess > 100;
  else if (guess > min && guess < max) return false;
};

/**
 *This ftn will update the range of both max and min values
 * @param {boolean} isLower - A bool that determines if the guess is higher or lower than the guessNumber
 * @param {array} range - The array of the range between max and min values
 * @param {number} guess - User's guess
 * @returns string
 */
const handleLowerOrHigher = (isLower, range, guess) => {
  if (isLower) {
    range[1] = `${guess}`;
    return `👇 Too Low. Please type a number: ${joinArr(range)}`;
  } else {
    range[3] = `${guess})`;
    return `☝️ Too High. Please type a number: ${joinArr(range)}`;
  }
};
