//Array of wrong guesses
const wrongGuesses = [];

const joinArr = (arr) => arr.join(' ');

const checkErrors = (guess, range) => {
  const min = +range[1];
  const max = Number(range[3].replace(')', ''));
  if (guess < 0 || guess > 100) return true;
  if (!guess) return true;
  if (wrongGuesses.includes(guess)) return true;
  if (guess > max) return true;
  if (guess < min) return true;
  return false;
};

const handleLowerOrHigher = (isLower, range, guess) => {
  if (isLower) {
    range[1] = `${guess}`;
    return `👇 Too Low. Please type a number: ${joinArr(range)}`;
  }
  range[3] = `${guess})`;
  return `☝️ Too High. Please type a number: ${joinArr(range)}`;
};
