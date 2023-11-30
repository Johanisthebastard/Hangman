// Befintliga variabler och eventlyssnare för att hantera sidbyten och spelfunktioner
const startPage = document.querySelector('#startSection');
const gamePage = document.querySelector('#gamePage');
const highScorePage = document.querySelector('#highScorePage');
const play = document.querySelector('#play-btn');
const killBtn = document.querySelector('#kill-btn');
const scoreButton = document.querySelector('#highScore-btn');
const backToGame = document.querySelector('#backToGameBtn');
let playerName
// Koden för ordgissningsspelet
import words from "./svenska-ord.js";

const difficultyRadios = document.querySelectorAll('input[name="level"]');
const guessInput = document.getElementById('guess'); // bör undersökas
const letterButtons = document.querySelectorAll(".key-container [data-key]");
console.log('letterbuttons is ', letterButtons);
const wordDisplay = document.getElementById('wordDisplay');

let gameWon
let gameDate
let wordLength
let chosenWord;
let wordState;
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;

//ändring har gjorts
function updateWord(event) {
	const selectedDifficulty = event.target.value;
	chosenWord = chooseWord(words, selectedDifficulty).toUpperCase();
	console.log('Cheat mode - ta bort innan publiuceriung!! ', chosenWord);
	wordState = "_".repeat(chosenWord.length);
	guessedLetters = [];
	wrongGuesses = 0;
	wordLength = chosenWord.length;
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
	// ändring har gjorts 
	updateWordDisplay();

	if (wrongGuesses === maxWrongGuesses) {
		console.log("You lose!");
		gameWon = false;
		//function reset game här
		// Skriv ut på sidan "du förlorade"

	} else if (!wordState.includes("_")) {
		console.log("You win!");
		gameWon = true;
		// Skriv ut på sidan "du vann"
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
// ändring har gjorts 
play.addEventListener('click', () => {
	playerName = document.getElementById('userInput').value,
		gameDate = new Date()
	startPage.classList.add('invisible')
	gamePage.classList.remove('invisible')
});
// ändring har gjorts 
scoreButton.addEventListener('click', () => {
	saveGameResult(playerName, wordLength, wrongGuesses, gameDate, gameWon);
	displayGameResults(false);
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


// function för att spara highscore till local storage
function saveGameResult(username, wordLength, wrongGuesses, date, won) {
	const gameResults = JSON.parse(localStorage.getItem('gameResults')) || [];
	gameResults.push({ username, wordLength, wrongGuesses, date, won });
	gameResults.sort((a, b) => {
		if (a.wrongGuesses !== b.wrongGuesses) {
			return a.wrongGuesses - b.wrongGuesses;
		} else {
			return new Date(b.date) - new Date(a.date);
		}
	})
	localStorage.setItem('gameResults', JSON.stringify(gameResults));
}
// function för att visa game result på poängvyn
function displayGameResults(sortByDate) {
	const gameResultContainer = document.querySelector('.gameResult-container')
	const gameResults = JSON.parse(localStorage.getItem('gameResults')) || []
	gameResultContainer.innerHTML = '';

	if (sortByDate) {
		gameResults.sort((a, b) => new Date(b.date) - new Date(a.date))

	}
	gameResults.forEach((entry, index) => {
		const tableRow = document.createElement('tr')
		tableRow.innerHTML = `
    <th scope="row">${entry.username}</th>
    <td>${entry.wordLength}</td>
    <td>${entry.wrongGuesses}</td>
   <td>${new Date(entry.date).toLocaleString()}</td>
    <td>${entry.won ? 'Won' : 'Lost'}</td>
`;
		gameResultContainer.appendChild(tableRow)
	})
}
saveGameResult(playerName, wordLength, wrongGuesses, gameDate, gameWon)
displayGameResults(false)