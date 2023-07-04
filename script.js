/* eslint-disable no-undef */
/**
 * This ftn genarates random numbers between 1 and 100
 * @returns A random number
 */
const randomNumber = () => Math.trunc(Math.random() * 100) + 1;

//Creating a Global variable for the guessing Number
let guessNumber = randomNumber();
//Array of wrong guesses
const wrongGuesses = [];
//Array of highScore
const highScore = 0;

/**
 * Creates an array from the range data
 * @returns An array of range
 */
const createRangeArray = () =>
  document.querySelector('.between').textContent.split(' ');
/**
 *Change the array (Between,1,and,100) to (Between[0] 1[1] and[2] 100)[3]
 * @param {array} arr - The array of the range between max and min values
 * @returns string
 */
const joinArr = (arr) => arr.join(' ');

/**
 *This ftn will display a massage to the user
 * @param {string} message -The game massage that will be displayed to the user
 */
const displayMessage = (message) => {
  document.querySelector('.message').textContent = message;
};

/**
 *This ftn will check for errors
 * @param {number} guess - User's guess
 * @param {array} range - Last value of the range
 * @returns - true if the data is invalid
 *          - false if the data is valid
 */
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
    document.querySelector('.between').textContent = joinArr(range);
    return `👇 Too Low. Please type a number: ${joinArr(range)}`;
  }
  range[3] = `${guess})`;
  document.querySelector('.between').textContent = joinArr(range);
  return `☝️ Too High. Please type a number: ${joinArr(range)}`;
};

/**
 * Decreases the score by 1 and updates the score
 */
const decreaseScore = () => {
  let score = +document.querySelector('.score').textContent;
  score--;
  document.querySelector('.score').textContent = score.toString();
};

/**
 * This ftn will change the layout when the user wins or reset the layout when the user clicks on again btn
 */
const winTemplate = () => {
  const body = document.querySelector('body');
  const number = document.querySelector('.number');
  const theUserWon = body.classList.contains('winBody');
  if (!theUserWon) {
    body.classList.add('winBody');
    number.classList.add('winNumber');
    number.textContent = guessNumber;
  } else {
    body.classList.remove('winBody');
    number.classList.remove('winNumber');
    number.textContent = '?';
  }
};

/**
 * ftn for the event listener
 */
const checkBtn = () => {
  //Show the range of numbers
  const range = createRangeArray();

  //The input(guess) converted to number
  const guess = Number(document.querySelector('.guess').value);

  //Get the score
  const score = +document.querySelector('.score').textContent;

  //Invalid data
  if (checkErrors(guess, range)) {
    displayMessage(`⛔ Please type a number: ${joinArr(range)}`);
  }
  //Guess bigger
  else if (guess > guessNumber) {
    wrongGuesses.push(guess);
    displayMessage(handleLowerOrHigher(false, range, guess));
    decreaseScore();
  }
  //Guess lower
  else if (guess < guessNumber) {
    wrongGuesses.push(guess);
    displayMessage(handleLowerOrHigher(true, range, guess));
    decreaseScore();
  } else if (score === 0) displayMessage('😭 Sorry, you lost!');
  else {
    winTemplate();
    // //Show the correct number on the screen
    // document.querySelector('.number').textContent = guessNumber;
    // //Change the background color of the body
    // document.querySelector('body').classList.add('winBody');
    // document.querySelector('.number').classList.add('winNumber');
    displayMessage('🏆 Congratulations, you win!');
    const currentScore = +document.querySelector('.score').textContent;
    const newScore = currentScore > highScore ? currentScore : highScore;
    document.querySelector('.highscore').textContent = newScore.toString();
  }
  wrongGuesses.sort((a, b) => a - b);
};

const resetBtn = () => {
  winTemplate();
  //Remove CSS from the body and change the square (put the question mark and make it narrower)
  // document.querySelector('body').classList.remove('winBody');
  // document.querySelector('.number').classList.remove('winNumber');
  // document.querySelector('.number').textContent = '?';

  //Reset the message, create another random number and clear the wrongGuesses array.
  displayMessage('Start guessing...');
  guessNumber = randomNumber();
  wrongGuesses.length = 0;

  //Clear the txtBox and reset the score
  document.querySelector('.guess').value = '';
  document.querySelector('.score').textContent = '20';

  //Reset the range of min and max values
  const range = createRangeArray();
  range[1] = '1';
  range[3] = '100)';
  document.querySelector('.between').textContent = joinArr(range);
};
window.onload = function () {
  document.querySelector('.check').addEventListener('click', checkBtn);
  document.querySelector('.again').addEventListener('click', resetBtn);
};
