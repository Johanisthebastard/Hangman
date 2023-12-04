import words from "./svenska-ord.js";


const difficultyRadios = document.querySelectorAll('input[name="level"]');
const guessInput = document.getElementById('guess');
const guessButton = document.getElementById('#');
let chosenWord;

difficultyRadios.forEach(radio => {
    radio.addEventListener("change", updateWord);
});

guessButton.addEventListener('keydown', () => {
    const guessedLetter = guessInput.value.toLowerCase();
    if (guessedLetter.length === 1 && /^[a-zA-Z]$/.test(guessedLetter)) {
        const displayArray = chosenWord ? Array(chosenWord.length).fill('_') : [];

        console.log(checkLetter(chosenWord, guessedLetter, displayArray));
    }
});


// SVÅRIGHETS-GRAD
function updateWord(event) {
    const selectedDifficulty = event.target.value;
    chosenWord = chooseWord(words, selectedDifficulty);
    guessInput.value = '';
}

function chooseWord(words, difficulty) {
    let filteredWords
    if (difficulty == 'easy') {
        filteredWords = words.filter(word => word.length === 10);
    }

    else if (difficulty == 'medium') {
        filteredWords = words.filter(word => word.length === 7);
    }

    else if (difficulty == 'hard') {
        filteredWords = words.filter(word => word.length === 5);
    }


    //Väljer ut ordet av slump
    const index = Math.floor(Math.random() * filteredWords.length);
    return filteredWords[index]
}



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

console.log('Chosen Word:', chosenWord);

export default {chosenWord, wordArray, guessedLetter}


