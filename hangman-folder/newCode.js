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

let hintUsed = false;
let hint = 0;



let chosenWord;
let wordState;
let guessedLetters = [];
let wrongGuesses = 0;
let gameWon;
let gameDate;
let wordLength;
const maxWrongGuesses = 6;

//ändring har gjorts
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
	// ändring har gjorts 
	updateWordDisplay();
	console.log('Nu sparar vi!', playerName, wordLength, wrongGuesses, gameDate, gameWon);


	if (wrongGuesses === maxWrongGuesses) {
		gameWon = false;
		console.log("You lose!");
		// Show the game result modal with "Du förlorade"
		document.getElementById('resultText').innerText = 'Haha, Du förlorade! Ordet var: ' + chosenWord, 'Du gissade', 'gånger'
		document.getElementById('gameResult').style.display = 'block';
		saveGameResult(playerName, wordLength, wrongGuesses, gameDate, gameWon, hintUsed)
	} else if (!wordState.includes("_")) {
		gameWon = true;
		console.log("You win!");
		// Show the game result modal with "Du vann"
		document.getElementById('resultText').innerText = 'LOL, Du vann! Ordet var: ' + chosenWord, ' och du gissade', 'gånger';

		document.getElementById('gameResult').style.display = 'block';
		saveGameResult(playerName, wordLength, wrongGuesses, gameDate, gameWon, hintUsed)
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
			gamePage.classList.add('invisible')
			highScorePage.classList.remove('invisible')
			displayGameResults()

		});
	}
});



function updateWordDisplay() {
	wordDisplay.textContent = wordState.split('').join(' ');
}

// Eventlyssnare för att hantera spelets nivå
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


// ändrar css klass på tangenterna vid knapptryck
letterButtons.forEach((key) => {
	console.log('letterButtons forEach');
	key.addEventListener("click", () => {
		guess(key.dataset.key.toLowerCase());
		key.classList.add("clicked")
	});
});

// guess.forEach((clickedButton) =>{

// })


//
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

//Knapp
scoreButton.addEventListener('click', () => {
	gamePage.classList.add('invisible')
	highScorePage.classList.remove('invisible')
	displayGameResults()
});
//Knapp
backToGame.addEventListener('click', () => {
	highScorePage.classList.add('invisible')
	startPage.classList.remove('invisible')
	resetGame()
});

//Kroppsdelar
const parts = [ground, scaffold, head, body, arms, legs];
let currentIndex = 0;

parts.forEach(part => part.classList.add('invisible'));

// HIIIIIIINTS
hintBtn.addEventListener('click', () => {
	chickenShit()
	console.log(`Knappen har klickats ${hint} gånger`);

});

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
		const keyElement = document.querySelector(`[data-key="${theLetter}"]`);
		if (keyElement) {
			keyElement.classList.add("clicked");
		}
		for (let i = 0; i < chosenWord.length; i++) {
			if (chosenWord[i] === theLetter) {
				wordState = wordState.substring(0, i) + theLetter + wordState.substring(i + 1);
			}
		}
		updateWordDisplay()
		hint++;
		hintUsed = true
		console.log("Hint used", hintUsed);
	}
	//return acc
}
if (unGuessed.length > 0) {
	const randomIndex = unGuessed[Math.floor(Math.random() * unGuessed.length)]

	const theLetter = chosenWord[randomIndex];
	const keyElement = document.querySelector(`[data-key="${theLetter}"]`);
	if (keyElement) {
		keyElement.classList.add("clicked");
	}
	for (let i = 0; i < chosenWord.length; i++) {
		if (chosenWord[i] === theLetter) {
			wordState = wordState.substring(0, i) + theLetter + wordState.substring(i + 1);
		}
	}
	// wordState = wordState.substring(0, randomIndex) + chosenWord[randomIndex] + wordState.substring(randomIndex + 1)
	updateWordDisplay()
	//checkForWin()
	hint++;
	hintUsed = true;
	console.log("Hint used:", hintUsed);
	console.log("Hint", hint);
}


function switchPage() {
	startPage.classList.toggle('invisible')
	gamePage.classList.toggle('invisible')
}


function resetGame() {
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

/// sorterings knapp 

document.addEventListener('DOMContentLoaded', () => {
	const sortButton = document.getElementById('sortButton');
	let sortByDate = false;  // Ensure sortByDate is initialized

	if (sortButton) {
		sortButton.addEventListener('click', () => {
			sortByDate = !sortByDate;  // Toggle sortByDate value
			displayGameResults(sortByDate);
		});
	}


});


console.log("Hint used:", hintUsed); // Add this line

// function för att spara highscore till local storage

function saveGameResult(username, wordLength, wrongGuesses, date, won, hintUsed) {
	const gameResults = JSON.parse(localStorage.getItem('gameResults')) || [];
	gameResults.push({
		username,
		wordLength,
		wrongGuesses,
		date,
		won,
		hintUsed: hintUsed,
	});


	gameResults.sort(sortGameResults);
	localStorage.setItem('gameResults', JSON.stringify(gameResults));
}

function sortGameResults(a, b) {
	if (a.wrongGuesses !== b.wrongGuesses) {
		return a.wrongGuesses - b.wrongGuesses;
	}

	// Place players who used the hint at the bottom
	if (a.hintUsed && !b.hintUsed) {
		return 1;
	} else if (!a.hintUsed && b.hintUsed) {
		return -1;
	}

	const dateComparison = new Date(b.date) - new Date(a.date);
	if (dateComparison !== 0) {
		return dateComparison;
	}

	return 0;
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
	<td>${entry.hintUsed ? 'Used' : 'Not Used'}</td>

`;
		gameResultContainer.appendChild(tableRow)


	})
}

displayGameResults(false)


