// Befintliga variabler och eventlyssnare för att hantera sidbyten och spelfunktioner
const startPage = document.querySelector('#startSection');
const gamePage = document.querySelector('#gamePage');
const highScorePage = document.querySelector('#highScorePage');
const play = document.querySelector('#play-btn');
const hintBtn = document.querySelector('#hint-btn');
const scoreButton = document.querySelector('#highScore-btn');
const backToGame = document.querySelector('#backToGameBtn');

// Koden för ordgissningsspelet
import words from "./svenska-ord.js";

const difficultyRadios = document.querySelectorAll('input[name="level"]');
const guessInput = document.getElementById('guess'); // bör undersökas
const letterButtons = document.querySelectorAll(".key-container [data-key]");
console.log('letterbuttons is ', letterButtons);
const wordDisplay = document.getElementById('wordDisplay');

let hint = 0;
let chosenWord;
let wordState;
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;

function updateWord(event) {
	const selectedDifficulty = event.target.value;
	chosenWord = chooseWord(words, selectedDifficulty).toUpperCase();
	console.log('Cheat mode - ta bort innan publiuceriung!! ', chosenWord);
	wordState = "_".repeat(chosenWord.length);
	guessedLetters = [];
	wrongGuesses = 0;
	updateWordDisplay();
}

function chooseWord(words, difficulty) {
	let filteredWords;
	if (difficulty === 'easy') {
		filteredWords = words.filter(word => word.length === 10);
	} else if (difficulty === 'medium') {
		filteredWords = words.filter(word => word.length === 7);
	} else if (difficulty === 'hard') {
		filteredWords = words.filter(word => word.length === 5);
	}
	const index = Math.floor(Math.random() * filteredWords.length);
	return filteredWords[index];
}

function guess(guessedLetter) {
	console.log('Guess: ', guessedLetter);
	if (guessedLetter.length === 1 && /^[a-zåäö A-ZÅÄÖ]$/.test(guessedLetter)) {
		guessLetter(guessedLetter.toUpperCase());
	}
}
function guessLetter(letter) {
	if (guessedLetters.includes(letter)) {
		return;
	}
	guessedLetters.push(letter);

	if (chosenWord.includes(letter)) {
		let newWordState = "";
		for (let i = 0; i < chosenWord.length; i++) {
			newWordState += chosenWord[i] === letter ? letter : wordState[i];
		}
		wordState = newWordState;
	} else {
		wrongGuesses++;
		// Visa en del av gubben för varje felaktig gissning
		if (wrongGuesses <= parts.length) {
			parts[wrongGuesses - 1].classList.remove('invisible');
		}
	}

	updateWordDisplay();

	if (wrongGuesses === maxWrongGuesses) {
		console.log("You lose!");
		//function reset game här
		// Skriv ut på sidan "du förlorade"

	} else if (!wordState.includes("_")) {
		console.log("You win!");
		// Skriv ut på sidan "du vann"
		//append innerText in a div
		//Spara highscore om det är mer poäng än tidigare spelare, om inget highscore finns så lägg in i listan.
	}
}


function updateWordDisplay() {
	wordDisplay.textContent = wordState.split('').join(' ');
}

// Eventlyssnare för att hantera spelet
difficultyRadios.forEach(radio => {
	radio.addEventListener("change", updateWord);
});

// Event listener för att använda tangenter
document.addEventListener('keydown', (event) => {
	if (gamePage.classList.contains("invisible")) {

		return;
	}
	const pressedKey = event.key.toLowerCase();
	if (/^[a-zåäö]$/.test(pressedKey) && !guessedLetters.includes(pressedKey)) {
		guess(pressedKey);

	}
});

letterButtons.forEach((key) => {
	console.log('letterButtons forEach');
	key.addEventListener("click", () => {
		guess(key.dataset.key.toLowerCase());
		key.classList.add("clicked")
	});
});

// guess.forEach((clickedButton) =>{

// })


// Fortsättning av din befintliga kod för sidnavigering och hantering av gubbe
play.addEventListener('click', () => {
	startPage.classList.add('invisible')
	gamePage.classList.remove('invisible')
});

scoreButton.addEventListener('click', () => {
	gamePage.classList.add('invisible')
	highScorePage.classList.remove('invisible')
});

backToGame.addEventListener('click', () => {
	highScorePage.classList.add('invisible')
	gamePage.classList.remove('invisible')
});

const parts = [ground, scaffold, head, body, arms, legs];
let currentIndex = 0;

parts.forEach(part => part.classList.add('invisible'));

// Hint
hintBtn.addEventListener('click', () => {
	chickenShit()
	console.log(`Knappen har klickats ${hint} gånger`);
});

let hintClicks = 0;
function chickenShit() {
	const unGuessed = wordState.split("").reduce((acc, letter, index) => {
		if (letter === "_") {
			acc.push(index)
		}
		return acc
	}, [])
	if (unGuessed.length > 0) {
		const randomIndex = unGuessed[Math.floor(Math.random() * unGuessed.length)]
		wordState = wordState.substring(0, randomIndex) + chosenWord[randomIndex] + wordState.substring(randomIndex + 1)
		updateWordDisplay()
		checkForWin()
		hintClicks++;
	}
}
