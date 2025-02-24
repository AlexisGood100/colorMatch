let colors = ['#6A0DAD', '#4B0082', '#2C3E50', '#27AE60', '#8E44AD', '#F39C12', '#C0392B', '#7D3C98', '#A6ACAF', '#D35400', '#34495E', '#BDC3C7'];

let score = 0;
let timeLeft = 30;
let timerId;

const topColor = document.getElementById('top-color');
const colorBoxes = document.querySelectorAll('.color-box');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

// Start a new game
function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = `Score: ${score}`;
  timerDisplay.textContent = `Time: ${timeLeft}`;
  generateNewRound();
  startTimer();
}

// Generate a new round of colors
function generateNewRound() {
  const randomTopColor = colors[Math.floor(Math.random() * colors.length)];
  topColor.style.backgroundColor = randomTopColor;

  const correctIndex = Math.floor(Math.random() * 4);
  colorBoxes[correctIndex].style.backgroundColor = randomTopColor;

  // Create an array of colors for the choices
  let choiceColors = [randomTopColor];

  // Fill the other boxes with random colors, ensuring no duplicates
  while (choiceColors.length < 4) {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    if (!choiceColors.includes(randomColor)) {
      choiceColors.push(randomColor);
    }
  }

  // Shuffle the colors array to randomize placement
  choiceColors = shuffleArray(choiceColors);

  // Assign colors to boxes
  colorBoxes.forEach((box, index) => {
    box.style.backgroundColor = choiceColors[index];
  });
}

// Shuffle an array to randomize color positions
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }
  return arr;
}

// Start the timer
function startTimer() {
  timerId = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      alert(`Game Over! Your final score is ${score}`);
    }
  }, 1000);
}

// Handle color click
colorBoxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (box.style.backgroundColor === topColor.style.backgroundColor) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      generateNewRound();
    } else {
      alert('Wrong color! Game Over!');
      clearInterval(timerId);
      setTimeout(()=>{
        window.location.href = '/'; // This will take the user to the homepage
    },1000);
    }
  });
});

// Start the game when the page loads
window.onload = startGame;
