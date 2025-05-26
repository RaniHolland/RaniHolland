const startScreen = document.getElementById("start-screen");
const gameContainer = document.getElementById("game-container");
const endScreen = document.getElementById("end-screen");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const finalScore = document.getElementById("final-score");

let score = 0;
let timeLeft = 40;
let gameInterval, timerInterval;

function getRandomPosition() {
  const x = Math.random() * (window.innerWidth - 90);
  const y = Math.random() * (window.innerHeight - 90);
  return { x, y };
}

function createCreature() {
  const creature = document.createElement("div");
  creature.classList.add("creature");

  // סיכויים: הרבה דגים וכרישים, יותר פצצות ודולפינים
  const weightedTypes = [
    ...Array(6).fill({ class: "fish", points: 1 }),     // דגים
    ...Array(5).fill({ class: "shark", points: -1 }),   // כרישים
    ...Array(3).fill({ class: "bomb", points: -3 }),    // פצצות - יותר מבעבר
    ...Array(3).fill({ class: "dolphin", points: 3 })   // דולפינים - יותר מבעבר
  ];

  const selected = weightedTypes[Math.floor(Math.random() * weightedTypes.length)];
  creature.classList.add(selected.class);

  const { x, y } = getRandomPosition();
  creature.style.left = `${x}px`;
  creature.style.top = `${y}px`;

  // סיבוב אקראי בין 0 ל-360 מעלות
  const rotation = Math.floor(Math.random() * 360);
  creature.style.transform = `rotate(${rotation}deg)`;

  creature.addEventListener("click", () => {
    score += selected.points;
    if (score < 0) score = 0;
    scoreDisplay.textContent = `נקודות: ${score}`;
    creature.remove();
  });

  gameContainer.appendChild(creature);

  // עכשיו היצורים ייעלמו אחרי 1.8 שניות (1800 מילישניות)
  setTimeout(() => {
    creature.remove();
  }, 1800);
}

function startGame() {
  score = 0;
  timeLeft = 40;
  scoreDisplay.textContent = "נקודות: 0";
  timerDisplay.textContent = "40";

  startScreen.style.display = "none";
  endScreen.style.display = "none";
  gameContainer.style.display = "block";

  gameInterval = setInterval(() => {
    const count = Math.floor(Math.random() * 4) + 7; // 7 עד 10 יצורים כל פעם
    for (let i = 0; i < count; i++) {
      createCreature();
    }
  }, 700);

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  gameContainer.style.display = "none";
  endScreen.style.display = "flex";
  finalScore.textContent = `צברת ${score} נקודות`;
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);

// הצג רק מסך פתיחה כשנטען
startScreen.style.display = "flex";
gameContainer.style.display = "none";
endScreen.style.display = "none";
