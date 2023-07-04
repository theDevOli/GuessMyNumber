//Creating a Global variable for the guessing Number
let guessNumber = Math.trunc(Math.random() * 100) + 1;

//Array of wrong guesses
const wrongGuesses = [];
//Array of highScore
let highScore = 0;

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
    document.querySelector('.between').textContent = joinArr(range);
    return `👇 Too Low. Please type a number: ${joinArr(range)}`;
  } else {
    range[3] = `${guess})`;
    document.querySelector('.between').textContent = joinArr(range);
    return `☝️ Too High. Please type a number: ${joinArr(range)}`;
  }
};
/**
 * Decreases the score by 1 and updates the score
 */
const decreaseScore = () => {
  let score = +document.querySelector('.score').textContent;
  score--;
  document.querySelector('.score').textContent = score + '';
};
/**
 * ftn for the event listener
 */
const checkBtn = () => {
  if (typeof window !== 'undefined') {
    //Show the range of numbers
    let range = document.querySelector('.between').textContent.split(' ');

    //The input(guess) converted to number
    const guess = Number(document.querySelector('.guess').value);

    //The message that updates he user
    const lblMessage = document.querySelector('.message');

    //Get the score
    let score = +document.querySelector('.score').textContent;

    //Invalid data
    if (checkErrors(guess, range)) {
      lblMessage.textContent = `⛔ Please type a number: ${joinArr(range)}`;
    }
    //Guess bigger
    else if (guess > guessNumber) {
      wrongGuesses.push(guess);
      lblMessage.textContent = handleLowerOrHigher(false, range, guess);
      decreaseScore();
    }
    //Guess lower
    else if (guess < guessNumber) {
      wrongGuesses.push(guess);
      lblMessage.textContent = handleLowerOrHigher(true, range, guess);
      decreaseScore();
    } else if (score === 0) lblMessage.textContent = '😭 Sorry, you lost!';
    else {
      //Show the correct number on the screen
      document.querySelector('.number').textContent = guessNumber;
      //Change the background color of the body
      document.querySelector('body').classList.add('winBody');
      document.querySelector('.number').classList.add('winNumber');
      lblMessage.textContent = '🏆 Congratulations, you win!';
      let currentScore = +document.querySelector('.score').textContent;
      currentScore > highScore
        ? currentScore === highScore
        : currentScore === currentScore;
      document.querySelector('.highscore').textContent = currentScore + '';
    }
    wrongGuesses.sort((a, b) => a - b);
  }
};

const resetBtn = () => {
  //Remove CSS from the body and change the square (put the question mark and make it narrower)
  document.querySelector('body').classList.remove('winBody');
  document.querySelector('.number').classList.remove('winNumber');
  document.querySelector('.number').textContent = '?';

  //Reset the message, create another random number and clear the wrongGuesses array.
  document.querySelector('.message').textContent = 'Start guessing...';
  guessNumber = Math.trunc(Math.random() * 100) + 1;
  wrongGuesses.length = 0;

  //Clear the txtBox and reset the score
  document.querySelector('.guess').value = '';
  document.querySelector('.score').textContent = '20';

  //Reset the range of min and max values
  let range = document.querySelector('.between').textContent.split(' ');
  range[1] = '1';
  range[3] = '100)';
  document.querySelector('.between').textContent = joinArr(range);
};
window.onload = function () {
  document.querySelector('.check').addEventListener('click', checkBtn);
  document.querySelector('.again').addEventListener('click', resetBtn);
};
