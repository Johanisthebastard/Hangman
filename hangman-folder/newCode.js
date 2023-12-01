// Befintliga variabler och eventlyssnare för att hantera sidbyten och spelfunktioner
const startPage = document.querySelector('#startSection');
const gamePage = document.querySelector('#gamePage');
const highScorePage = document.querySelector('#highScorePage');
const play = document.querySelector('#play-btn');
const hintBtn = document.querySelector('#hint-btn');
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

let hint = 0;
let chosenWord;
let wordState;
let guessedLetters = [];
let wrongGuesses = 0;
let gameWon ;
let gameDate ;
let wordLength ;
const maxWrongGuesses = 6;

function updateWord(event) {
	const levels = document.querySelectorAll('input[name="level"]');
	let selectedDifficulty = null
	levels.forEach((level) => {
		if (level.checked) selectedDifficulty = level.value


	})
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

	updateWordDisplay();
	console.log('Nu sparar vi!', playerName, wordLength, wrongGuesses, gameDate, gameWon );


	if (wrongGuesses === maxWrongGuesses) {
		gameWon = false;
		console.log("You lose!");
		// Show the game result modal with "Du förlorade"
		document.getElementById('resultText').innerText = 'Haha, Du förlorade! Ordet var: ' + chosenWord
		document.getElementById('gameResult').style.display = 'block';
		saveGameResult(playerName, wordLength, wrongGuesses, gameDate, gameWon)
	} else if (!wordState.includes("_")) {
		gameWon = true;
		console.log("You win!");
		// Show the game result modal with "Du vann"
		document.getElementById('resultText').innerText = 'Du vann LOL!';
		document.getElementById('gameResult').style.display = 'block';
		saveGameResult(playerName, wordLength, wrongGuesses, gameDate, gameWon)
	}

	// Function to close the modal

} // SPELET SLUTAR

//CLOSE PAGE & RESET GAME
document.addEventListener('DOMContentLoaded', () => {
		const resetButton = document.getElementById('reset-btn');
		if (resetButton) {
			resetButton.addEventListener('click', () => {
				document.getElementById('gameResult').style.display = 'none';
				switchPage()
				resetGame()
			});
		}
	});

// CLOSE ONLY
document.addEventListener('DOMContentLoaded', () => {
	const closeButton = document.getElementById('close-btn');
	if (closeButton) {
		closeButton.addEventListener('click', () => {
			document.getElementById('gameResult').style.display = 'none';
		});
	}
});



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
		const keyElement = document.querySelector(`[data-key="${pressedKey.toUpperCase()}"]`)
		if (keyElement) {
			keyElement.classList.add("clicked");
		}
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
		const userReq = document.querySelector("#userInput").value;
		if (!userReq) {
			document.querySelector(".alertTheNerd").style.visibility = "visible";
			return;
		}
		document.querySelector(".alertTheNerd").style.visibility = "hidden";
		updateWord()
		switchPage()
		playerName = document.getElementById('userInput').value,
		gameDate = new Date()
	});

	scoreButton.addEventListener('click', () => {
		gamePage.classList.add('invisible')
		highScorePage.classList.remove('invisible')
		displayGameResults()
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
			const theLetter = chosenWord[randomIndex];
			for (let i = 0; i < chosenWord.length; i++){
				if (chosenWord[i] === theLetter) {
					wordState = wordState.substring(0, i) + theLetter + wordState.substring(i + 1);
				}
			}
			// wordState = wordState.substring(0, randomIndex) + chosenWord[randomIndex] + wordState.substring(randomIndex + 1)
			updateWordDisplay()
			checkForWin()
			hintClicks++;
		}
	}

	function switchPage() {
		startPage.classList.toggle('invisible')
		gamePage.classList.toggle('invisible')
	}


	function resetGame(){
		resetKeyboardAppearance()
		updateWord()
		hint = 0;

	}

	function resetKeyboardAppearance() {
		letterButtons.forEach((key) => {
			key.classList.remove("clicked");
		});
	}


	/// HIIIIIIIGH SCOOOOOORE


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
	console.log('gameResults', gameResults);
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

displayGameResults(false)



// TOGGLE VIEWS (från david)
play.addEventListener('click', showPlayView)

function hideViews() {
	allTheViews.forEach(view => {
		view.classList.add('invisible')
	})
}
function showPlayView() {
	hideViews()
	gamePage.classList.remove('invisible')
}