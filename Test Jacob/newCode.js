// Befintliga variabler och eventlyssnare för att hantera sidbyten och spelfunktioner
const startPage = document.querySelector('#startSection');
const gamePage = document.querySelector('#gamePage');
const highScorePage = document.querySelector('#highScorePage');
const play = document.querySelector('#play-btn');
const killBtn = document.querySelector('#kill-btn');
const scoreButton = document.querySelector('#highScore-btn');
const backToGame = document.querySelector('#backToGameBtn');

// Koden för ordgissningsspelet
import words from "./svenska-ord.js";

const difficultyRadios = document.querySelectorAll('input[name="level"]');
const guessInput = document.getElementById('guess');
const letterButtons = document.querySelectorAll("div.key-container div[data-key]");
const wordDisplay = document.getElementById('wordDisplay');

let chosenWord;
let wordState;
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;

function updateWord(event) {
	const selectedDifficulty = event.target.value;
	chosenWord = chooseWord(words, selectedDifficulty).toUpperCase();
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
	if (guessedLetter.length === 1 && /^[a-zA-Z]$/.test(guessedLetter)) {
		guessLetter(guessedLetter.toUpperCase());
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
		} else if (!wordState.includes("_")) {
			console.log("You win!");
		}
	}


function updateWordDisplay() {
	wordDisplay.textContent = wordState.split('').join(' ');
}

// Eventlyssnare för att hantera spelet
difficultyRadios.forEach(radio => {
	radio.addEventListener("change", updateWord);
});

guessInput.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		guess(guessInput.value.toLowerCase());
		guessInput.value = '';
	}
});

letterButtons.forEach((key) => {
	key.addEventListener("click", () => {
		guess(key.dataset.key.toLowerCase());
	});
});


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


}
