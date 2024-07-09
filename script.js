'use strict';

// Selecting elements
const number = document.querySelector('.number');
const icon = document.querySelector('.iconMessage');
const scoreEl = document.querySelector('.score');
const highscoreEl = document.querySelector('.highscore');
const body = document.querySelector('body');
const guessEl = document.querySelector('.guess');
const again = document.querySelector('.again');
const check = document.querySelector('.check');
const btns = document.querySelectorAll('.btn');

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

// Display message
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// Check when press Enter
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    checkGame();
  }
});

// Check when click on the button
check.addEventListener('click', function () {
  checkGame();
});

// Check the number
const checkGame = function () {
  const guess = Number(guessEl.value);

  // When there is no input
  if (!guess) {
    displayMessage('No number');
    icon.src = `img/forbidden.svg`;
    icon.classList.remove('hidden');

    // When player wins
  } else if (guess === secretNumber) {
    icon.src = `img/check_mark.svg`;
    icon.classList.remove('hidden');
    displayMessage('Correct Number!');
    number.textContent = secretNumber;
    body.style.backgroundColor = '#fab005';
    number.style.width = '30rem';

    for (const btn of btns) {
      btn.addEventListener('mouseover', function () {
        btn.style.backgroundColor = '#ccc';
        btn.style.color = '#222';
      });

      btn.addEventListener('mouseout', function () {
        btn.style.backgroundColor = '#eee';
        btn.style.color = '#222';
      });
    }

    // Update the highscore
    if (score > highscore) {
      highscore = score;
      highscoreEl.textContent = highscore;
    }

    // When guess is wrong
  } else if (guess !== secretNumber) {
    // When there's still chances
    if (score > 1) {
      icon.src = `img/red_cross.svg`;
      icon.classList.remove('hidden');
      displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
      score--;
      scoreEl.textContent = score;

      // When the score ended up
    } else {
      icon.src = `img/skull.svg`;
      icon.classList.remove('hidden');
      displayMessage('You lost!');
      scoreEl.textContent = 0;
    }
  }
};

// Reset the game
again.addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  icon.src = `img/flag.svg`;
  displayMessage('Start guessing...');
  icon.classList.remove('hidden');
  number.textContent = '?';
  scoreEl.textContent = score;
  guessEl.value = '';
  body.style.backgroundColor = '#222';
  number.style.width = '15rem';

  for (const btn of btns) {
    btn.addEventListener('mouseover', function () {
      btn.style.backgroundColor = '#fab005';
      btn.style.color = '#eee';
    });

    btn.addEventListener('mouseout', function () {
      btn.style.backgroundColor = '#ccc';
      btn.style.color = '#222';
    });
  }
});
