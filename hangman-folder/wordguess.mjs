import words from "./svenska-ord.mjs";

let chosenWord;

function easyPeasy(words) {
	const easyWords = words.filter(word => word.length === 10);
	if (easyWords.length > 0) {
		const easyIndex = Math.floor(Math.random() * easyWords.length);
		return easyWords[easyIndex];
	}
}

function mediumSquezy(words) {
	const mediumWords = words.filter(word => word.length === 7);
	if (mediumWords.length > 0) {
		const mediumIndex = Math.floor(Math.random() * mediumWords.length);
		return mediumWords[mediumIndex];
	}
}

function hardyParty(words) {
	const hardWords = words.filter(word => word.length === 5);
	if (hardWords.length > 0) {
		const hardIndex = Math.floor(Math.random() * hardWords.length);
		return hardWords[hardIndex];
	}
}
const difficulties = ['easyPeasy', 'mediumSquezy', 'hardyParty'];
const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
chosenWord = eval(`${randomDifficulty}(words)`);
const guessedLetter = 't';
const displayArray = Array(chosenWord.length).fill('_');

function checkLetter(chosenWord, guessedLetter, displayArray) {
	const wordArray = chosenWord.split('');
	let correctGuess = false;

	for (let i = 0; i < wordArray.length; i++) {
		if (wordArray[i] === guessedLetter) {
			displayArray[i] = guessedLetter;
			correctGuess = true;
		}
	}

	return correctGuess ? displayArray.join('') : false;
}

console.log('Random Difficulty:', randomDifficulty);
console.log('Chosen Word:', chosenWord);
console.log(checkLetter(chosenWord, guessedLetter, displayArray));

